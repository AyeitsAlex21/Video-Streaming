import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./css/NavBar.css"

function NavBar() {
    return (
      <nav class=".navbar">
        <ul className="navbar">
          <li><Link to="/home">Videos</Link></li>
          <li><Link to="/information">About Page</Link></li>
          <li><Link to="/">Login/Signup</Link></li>
        </ul>
      </nav>
    );
  }

export default NavBar;