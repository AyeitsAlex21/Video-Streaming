import React, { useEffect, useState } from 'react';
import styles from './VideoGrid.module.css';
import { Link } from 'react-router-dom';
import ChatComponent from './Chat';

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  // State to hold the search term

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
    fetchVideos();
  }, []); 

  // Update the displayed videos based on search term
  const filteredVideos = searchTerm
    ? videos.filter(video => video.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : videos;

  return (
    <div>
      <Link to={`/information`} >
        <h1>About Page</h1>
      </Link>
      
      <ChatComponent></ChatComponent>
      <h2>All Videos</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.container}>
        {filteredVideos.map((video) => (
          <Link to={`/video/${video.name}`} key={video.videoID} className={styles.videoItem} state={{ data: video }}>
            <img src={video.thumbnail_url} alt={video.name} />
            <h3>{video.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
