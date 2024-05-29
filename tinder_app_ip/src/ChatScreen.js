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
    const [notifications, setNotifications] = useState([]);
    const { person } = useParams(); // Extract the 'person' parameter from the URL
    const currentUser = auth.currentUser;
    
    useEffect(() => {
        // Fetch matched user's data from Firebase Firestore
        const fetchMatchedUser = async () => {
            try {
                const matchedUserDoc = await firebase.firestore().collection('people').doc(person).get(); // Use 'person' parameter as the document ID
                if (matchedUserDoc.exists) {
                    setMatchedUser(matchedUserDoc.data());
                } else {
                    console.log('No matched user found.');
                }
            } catch (error) {
                console.error('Error fetching matched user:', error);
            }
        };

        fetchMatchedUser();

        // Subscribe to notifications for the matched user
        const unsubscribeNotifications = firebase.firestore().collection('people').doc(person)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    setNotifications(userData.notifications || []);
                } else {
                    setNotifications([]);
                }
            });

        return () => {
            unsubscribeNotifications();
        };
    }, [person]); // Update when the 'person' parameter changes

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('messages')
            .where('senderName', 'in', [currentUser?.uid, person])
            .where('receiverName', 'in', [currentUser?.uid, person])
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                const messagesData = snapshot.docs.map(doc => doc.data());
                setMessages(messagesData);
            });
    
        // Fetch notifications and format them as "<sender>: <message>"
        const fetchNotifications = async () => {
            try {
                const matchedUserDoc = await firebase.firestore().collection('people').doc(person).get();
                if (matchedUserDoc.exists) {
                    const userData = matchedUserDoc.data();
                    const formattedNotifications = userData.notifications.map(notification => `${notification.sender}: ${notification.content}`);
                    setNotifications(formattedNotifications);
                } else {
                    setNotifications([]);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
    
        fetchNotifications();
    
        return () => unsubscribe();
    }, [person, currentUser.uid]);
    
    

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            const newMessage = { senderName: currentUser?.uid, receiverName: person, timestamp: new Date(), content: input };
            setInput('');

            // Add new message to Firebase Firestore
            try {
                // Add the message to the 'messages' collection
                await firebase.firestore().collection('messages').add(newMessage);
            
                // Add the notification to the receiver's 'people' document
                await firebase.firestore().collection('people').doc(person).update({
                  notifications: firebase.firestore.FieldValue.arrayUnion({
                    type: 'message',
                    content: input,
                    sender: currentUser.uid,
                    timestamp: new Date()
                  })
                });
            
                console.log('Message sent and notification added');
              } catch (error) {
                console.error('Error sending message:', error);
              }
        }
    };

    return (
        <div className='chatScreen'>
            <div className='chatScreen__messages'>
                {messages.map((message, index) => (
                    <div key={index} className={message.senderName === currentUser?.uid ? 'chatScreen__messageUser' : 'chatScreen__message'}>
                        {message.senderName !== currentUser?.uid && (
                            <Avatar className='chatScreen__image' alt={message.senderName} src={matchedUser?.picture} />
                        )}
                        <p className={message.senderName === currentUser?.uid ? 'chatScreen__text chatScreen__textRight' : 'chatScreen__text'}>
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
            <form className='chatScreen__input' onSubmit={handleSend}>
                <input value={input} onChange={(e) => setInput(e.target.value)} className='chatScreen__inputField' type='text' placeholder='Type a message...' />
                <button type='submit' className='chatScreen__inputButton'>SEND</button>
            </form>
            
           {/* Display notifications */}
            {/* <div className="notifications">
                {notifications.map((notification, index) => (
                    <div key={index} className="notification">
                        {notification.sender}: {notification.content}
                    </div>
                ))}
            </div> */}

        </div>
    );
}

export default ChatScreen;
