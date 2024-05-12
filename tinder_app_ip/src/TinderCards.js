import React, { useState, useEffect } from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import database from "./firebase";

function TinderCards() {
    const [people, setPeople] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await database.collection('people').get();
                const fetchedPeople = data.docs.map(doc => doc.data());
                setPeople(fetchedPeople);
                setLoading(false);
                setError(null); // Clear any previous error
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    const onSwipe = (direction) => {
        if (direction === 'right') {
            // Increment currentIndex to move to the next person
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className='tinderCards__cardContainer'>
                {people.slice(currentIndex, currentIndex + 1).map(person => (
                    <TinderCard
                        className='swipe'
                        key={person.name}
                        onSwipe={(dir) => onSwipe(dir)}
                        preventSwipe={['up','down']}
                    >
                        <div
                            style={{backgroundImage: `url(${person.url})`}}
                            className='card'
                        >
                            <h3>{person.name}, {person.age}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TinderCards;
