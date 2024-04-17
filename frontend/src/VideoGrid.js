// src/VideoGrid.js
import React, { useEffect, useState } from 'react';

import styles from './VideoGrid.module.css';
import { Link } from 'react-router-dom';

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
