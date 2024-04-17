
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoGrid from './VideoGrid';
import VideoDisplay from './VideoDisplay';
import VideoUploadForm from './VideoUploadForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoGrid />} />
        <Route path="/upload" element={<VideoUploadForm />} />
        <Route path="/video/:videoID" element={<VideoDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
