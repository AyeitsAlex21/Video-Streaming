import React, { useState } from 'react';

function VideoUploadForm() {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('');
  const [name, setName] = useState('');

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form data...");

    const formData = new FormData();
    formData.append('video', video);
    formData.append('thumbnail', thumbnail);
    formData.append('description', description);
    formData.append('resolution', resolution);
    formData.append('name', name);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/uploadVideo/`, {
        method: 'POST',
        body: formData,  // FormData will be sent as multipart/form-data
      });

      const data = await response.json();

      if(data.thumbnail && data.video){
        await fetch(data.video, {
          method: 'PUT',
          body: {
            video: video, 
            thumbnail: thumbnail,
            description: description,
            resolution: resolution,
            name: name,
          },
          headers: {
            'Content-Type': 'video/mov',
          }
        });
        console.log('Video and thumbnail uploaded successfully!');
      }

      console.log(data);
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Video file:</label>
        <input type="file" accept="video/mov" onChange={handleVideoChange} required />
      </div>
      <div>
        <label>Thumbnail image:</label>
        <input type="file" accept="image/jpg" onChange={handleThumbnailChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Name:</label>
        <textarea value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Resolution:</label>
        <select value={resolution} onChange={(e) => setResolution(e.target.value)} required>
          <option value="">Select Resolution</option>
          <option value="480p">480p</option>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
          <option value="4k">4k</option>
        </select>
      </div>
      <button type="submit">Upload Video</button>
    </form>
  );
}

export default VideoUploadForm;
