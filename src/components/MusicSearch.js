import React, { useState } from 'react';
import { searchMusic } from './spotifyService';
import './MusicSearch.css';

const MusicSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedsongs, setLikedSongs] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const musicResults = await searchMusic(query);
    setResults(musicResults);
    setCurrentIndex(0); 
  };

  const handleNext = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLike = () => {
    const currentSong = results[currentIndex];
  
    if (!likedsongs.some(song => song.id === currentSong.id)) {
      setLikedSongs([...likedsongs, currentSong]);
    }
  };

  // Function to play a liked song
  const playlikedsong = (index) => {
    const likedSong = likedsongs[index];
    const resultIndex = results.findIndex(song => song.id === likedSong.id);
    if (resultIndex !== -1) {
      setCurrentIndex(resultIndex);
    } else {
      
      setResults([...results, likedSong]);
      setCurrentIndex(results.length); 
    }
  };

  return (
    <div>
      <div className='liked_list'>
        <p className='head_liked'>♥ Songs</p>
        <ul className='liked'>
          {likedsongs.map((song, index) => (
            <li key={index}>
              {song.name} - {song.artists[0].name}
              <br />
              <button className="play_liked" onClick={() => playlikedsong(index)}>Play</button>
            </li>
          ))}
        </ul>     
      </div>

      <h1>Spotify</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for music..."
        />
        <button type="submit">Search</button>
        <button onClick={handleLike} className="like-btn">
          ♥ Like
        </button>
      </form>

      {results.length > 0 && (
        <div className="player-container">
          <div className="player">
            
            <img
              src={results[currentIndex].album.images[0]?.url}
              alt={results[currentIndex].name}
            />
            <h3>{results[currentIndex].name}</h3>
            <p>Artist: {results[currentIndex].artists[0].name}</p>
            <audio controls src={results[currentIndex].preview_url}>
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={currentIndex === 0} className='prev_btn'>
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === results.length - 1} className='next_btn'
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicSearch;
