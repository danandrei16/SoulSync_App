import React, { useState, useEffect } from 'react';
import './Chats.css';
import Chat from './Chat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Chats() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Fetch people data from Firebase Firestore
    const fetchPeople = async () => {
      try {
        const data = await firebase.firestore().collection('people').get();
        const peopleData = data.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          age: doc.data().age
        }));
        setPeople(peopleData);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };

    fetchPeople();
  }, []); // Run once on component mount

  return (
    <div className='chats'>
      {people.map(person => (
        <Chat
          key={person.id} // Use the document ID as the key
          id={person.id} // Pass the document ID as a prop
          name={person.name}
          profilePic={person.url}
          age={person.age}
        />
      ))}
    </div>
  );
}

export default Chats;
