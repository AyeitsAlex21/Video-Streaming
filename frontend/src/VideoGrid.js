// src/VideoGrid.js
import React, { useEffect, useState } from 'react';


/*
Imagine you are an AI designed to recommend movies. A user will talk to you about what they want to watch when you prompt them to ask. Your task is to suggest new movies that align with their tastes, explaining why each recommendation is a good match based on the elements they enjoyed. Be sure to ask follow-up questions if needed to refine your suggestions further. Do not make any mention of me asking you to do this and commit to the role as a movie recommender and dont tell them a catalog of movies that we have just tell them the movies they might like to watch. Do not open with the movies we have on catalog just ask the user to give you some info about what they would like to watch.

do it from this list of movies ["mad max fury road", "star wars the 7th movie", "superman vs. batman"]
*/
import styles from './VideoGrid.module.css';
import { Link } from 'react-router-dom';
import ChatComponent from './Chat'

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [recommended, setRecommended] = useState([]);

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/listVideos/`);

        if (!response.ok) {
          throw new Error('list videos did not work');
        }
        const data = await response.json();
        setVideos(Object.values(data.data));
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    const fetchRecommended = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getRecommended/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecommended(data.data);
      } catch (error) {
        console.error('Failed to fetch recommended videos:', error);
      }
    };

    fetchVideos();
    fetchRecommended();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <ChatComponent></ChatComponent>
      <h2>Recommended Videos</h2>
      <div className={styles.container}>
        {recommended.map((video) => (
          <Link to={`/video/${video.name}`} key={video.videoID} className={styles.videoItem} state={{data : video}}>
            <img src={video.thumbnail_url} alt={video.name} />
            <p>{video.name}</p>
          </Link>
        ))}
      </div>

      <h2>All Videos</h2>
      <div className={styles.container}>
        {videos.map((video) => (
          <Link to={`/video/${video.name}`} key={video.videoID} className={styles.videoItem} state={{data : video}}>
            <img src={video.thumbnail_url} alt={video.name} />
            <h3>{video.name}</h3>
          </Link>
        ))}
      </div>
    </div>

  );
};

export default VideoGrid;
