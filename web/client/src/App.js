import React, { useState, useEffect } from 'react';
import axios from './axios';
import Joke from './components/Joke';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [joke, setJoke] = useState(null);

  const fetchNewJoke = async () => {
    try {
      const response = await axios.get('/api/jokes/joke', {
        withCredentials: true
      });
      setJoke(response.data);
      console.log(response.data)
    } catch (error) {
      setJoke(0);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewJoke();
  }, []);

  return (
    <div >
      {/* <!-- Banner --> */}
      <div class="banner">
        <h1 class="text-banner">A Joke a Day Keeps the Doctor Away</h1>
        <p class="text-banner">If you joke wrong way, your teeth have to pay. (Serious)</p>
      </div>

      {joke ? (
        <Joke joke={joke.joke} id={joke.id} fetchNewJoke={fetchNewJoke} />
      ) : (
        <div className="joke">
          <h4>That's all the jokes for today! Come back another day!</h4>

        </div>

      )}

      <footer className="footer">
        <div className="container">
          <span className="text-muted">This website is created as part of Hisolutions program. The materials contained on this website are provided for general information only and do not constitute any form of advice. HLS asstimes no responsibility for the accuracy of any particular statement and accepts no liability for any loss or damage which may arise from reliance on the information contained on this site.</span>
          <p className="text-muted">Copyright 2021 HLS</p>
        </div>
      </footer>
    </div>

  );
}

export default App;
