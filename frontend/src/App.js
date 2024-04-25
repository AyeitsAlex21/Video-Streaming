
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoGrid from './VideoGrid';
import VideoDisplay from './VideoDisplay';
import VideoUploadForm from './VideoUploadForm';
import SignInLogIn from './SignInLogIn';
import Information from './Information'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<SignInLogIn />} />
        <Route path="/home" element={<VideoGrid />} />
        <Route path="/upload" element={<VideoUploadForm />} />
        <Route path="/video/:videoID" element={<VideoDisplay />} />
        <Route path="/information" element={<Information />} />
      </Routes>
    </Router>
  );
}

export default App;
