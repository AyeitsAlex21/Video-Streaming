// src/VideoGrid.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [recommended, setRecommended] = useState([]);

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      const result = await axios(`${process.env.REACT_APP_API_URL}/listVideos`);
      setVideos(result.data);
    };

    const fetchRecommended = async () => {
      const result = await axios(`${process.env.REACT_APP_API_URL}/getRecommended`);
      setRecommended(result.data);
    };

    fetchVideos();
    fetchRecommended();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>Recommended Videos</h2>
      <div className="video-grid">
        {recommended.map((video) => (
          <div key={video.id} className="video-item">
            <img src={video.thumbnail} alt={video.name} />
            <p>{video.name}</p>
          </div>
        ))}
      </div>

      <h2>All Videos</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <img src={video.thumbnail} alt={video.name} />
            <p>{video.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
