import React from 'react';
import axios from 'axios';
import "./joke.css"

import Button from 'react-bootstrap/Button';

function Joke({ joke, id, fetchNewJoke }) {
    const handleVote = async (vote) => {

        try {
            await axios.post('/api/jokes/vote', { id, vote }, {
                withCredentials: true
            });
            fetchNewJoke();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="joke">
                <p className="joke-text">{joke}</p>

            </div>

            <div className="buttons">
                <Button variant="primary" onClick={() => handleVote('like')} size="lg">This is Funny!</Button>{' '}
                <Button variant="success" onClick={() => handleVote('dislike')} size="lg">This is not funny.</Button>{' '}
            </div>
        </div>
    );
}

export default Joke;
