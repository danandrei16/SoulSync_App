import React, { useState, useEffect } from 'react';
import './ChatScreen.css';
import { Avatar } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useParams } from 'react-router-dom';
import { auth } from './firebase'; // Import the auth instance from your firebase.js file

function ChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [matchedUser, setMatchedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const { person } = useParams(); // Extract the 'person' parameter from the URL

    useEffect(() => {
        // Fetch matched user's data from Firebase Firestore
        const fetchMatchedUser = async () => {
            try {
                const matchedUserDoc = await firebase.firestore().collection('people').doc(person).get(); // Use 'person' parameter as the document ID
                const currentUserDoc = await firebase.firestore().collection('people').doc(auth.currentUser.uid).get(); // Use 'person' parameter as the document ID
                if (matchedUserDoc.exists) {
                    setMatchedUser(matchedUserDoc.data());
                } else {
                    console.log('No matched user found.');
                }
                if (currentUserDoc.exists) {
                    setCurrentUser(currentUserDoc.data());
                } else {
                    console.log('No current user found.');
                }
            } catch (error) {
                console.error('Error fetching matched user:', error);
            }
        };

        fetchMatchedUser();
    }, [person]); // Update when the 'person' parameter changes

    useEffect(() => {
        // Fetch messages from Firebase Firestore
        const fetchMessages = async () => {
            try {
                const messagesSnapshot = await firebase.firestore().collection('messages')
                    .where('senderName', 'in', [currentUser?.name, matchedUser?.name])
                    .where('receiverName', 'in', [currentUser?.name, matchedUser?.name])
                    .orderBy('timestamp', 'asc')
                    .get();
                const messagesData = messagesSnapshot.docs.map(doc => doc.data());
                setMessages(messagesData);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [matchedUser]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            const newMessage = { senderName: currentUser?.name, receiverName: matchedUser?.name, timestamp: new Date(), content: input };
            setMessages([...messages, newMessage]);
            setInput('');

            // Add new message to Firebase Firestore
            try {
                await firebase.firestore().collection('messages').add(newMessage);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className='chatScreen'>
            <div className='chatScreen__messages'>
                {messages.map((message, index) => (
                    <div key={index} className={message.senderName === currentUser?.name ? 'chatScreen__messageUser' : 'chatScreen__message'}>
                        {message.senderName !== currentUser?.name && (
                            <Avatar className='chatScreen__image' alt={message.senderName} src={matchedUser?.picture} />
                        )}
                        <p className={message.senderName === currentUser?.name ? 'chatScreen__text chatScreen__textRight' : 'chatScreen__text'}>
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
            <form className='chatScreen__input' onSubmit={handleSend}>
                <input value={input} onChange={(e) => setInput(e.target.value)} className='chatScreen__inputField' type='text' placeholder='Type a message...' />
                <button type='submit' className='chatScreen__inputButton'>SEND</button>
            </form>
        </div>
    );
}

export default ChatScreen;
