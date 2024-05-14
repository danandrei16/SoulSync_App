import React, { useState, useEffect } from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import database from "./firebase";

function TinderCards() {
    const [people, setPeople] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false); // State to control showing user details

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
        if (currentIndex + 1 < people.length) {
            setCurrentIndex(currentIndex + 1);
            setShowDetails(false); // Reset details view when swiping
        }
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const undoDetails = () => {
        setShowDetails(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='tinderCards__cardContainer'>
            
            {/* Render the current and next cards */}
            {people.slice(currentIndex, currentIndex + 2).map((person, index) => (
                <div key={index} style={{ position: 'absolute', width: '100%', left: 0, zIndex: index === 0 ? 2 : 1 }}>
                    <TinderCard
                        className='swipe'
                        key={person.name}
                        onSwipe={(dir) => onSwipe(dir)}
                        preventSwipe={['up','down']}
                    >
                        <div
                            className='cardContainer'
                        >
                            <div
                                style={{backgroundImage: `url(${person.picture})`}}
                                className='card'
                            >
                                <h3>{person.name}, {person.age}</h3>
                                {showDetails && (
                                    <div className="details">
                                        <p>{person.description}</p>
                                        {/* Add more details as needed */}
                                    </div>
                                )}
                            </div>
                            {showDetails ? (
                                <button className="undoButton" onClick={undoDetails}>
                                    {/* Upper arrow icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <circle cx="12" cy="12" r="10" fill="white" />
                                        <path d="M12 15l-6-6h12z" fill="black"/>
                                    </svg>
                                </button>
                            ) : (
                                <button className="showDetailsButton" onClick={toggleDetails}>
                                    {/* Down arrow icon inside a circle */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <circle cx="12" cy="12" r="10" fill="white" />
                                        <path d="M12 9l-6 6h12z" fill="black"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </TinderCard>
                </div>
            ))}
        </div>
    );
}

export default TinderCards;
