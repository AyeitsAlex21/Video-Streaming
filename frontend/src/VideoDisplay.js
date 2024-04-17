
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './VideoDisplay.module.css'; // Your CSS module for this component

function VideoDisplay() {
  const location = useLocation();
  const { data: video } = location.state || {};

  console.log(video.video_url)
  return (
    <div className={styles.videoDisplayContainer}>
      <h2>{video.name}</h2>
        <video controls
          src={video.video_url}
          
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          poster={video.thumbnail_url}
          className={styles.videoFrame}
          type='video/mov'
        ></video>
      
      <p>{video.description}</p>

    </div>
  );
}

export default VideoDisplay;
