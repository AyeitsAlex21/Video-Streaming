import React, { useState } from 'react';

function VideoUploadForm() {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('');

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here, you'd typically call your backend to get pre-signed URLs for S3 uploads
    // and then upload the video and thumbnail using those URLs.
    // Finally, you'd send the metadata (description, resolution, etc.) along with the S3 URLs
    // of the uploaded files to your backend to store them in your database.
    console.log("Submit form data here...");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Video file:</label>
        <input type="file" accept="video/*" onChange={handleVideoChange} required />
      </div>
      <div>
        <label>Thumbnail image:</label>
        <input type="file" accept="image/*" onChange={handleThumbnailChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
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