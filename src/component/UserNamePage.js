// UsernamePage.js
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom'; 
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './UsernamePage.css'; 

function UsernamePage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();  // useNavigate instead of useHistory

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/api/portfolio/${username}`);  // Navigate to the Portfolio page with the username
    } else {
      alert("Please enter a valid username");
    }
  };

  return (
    <div className="username-page">
      <div className="form-container">
        <h1>Enter your Username </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
          />
          <button type="submit">Submit</button>
        </form>
        <div style={{ marginTop: '20px' }}>
        <p>New user?</p>
        {/* Link to go to PortfolioForm for new users */}
        <Link to="/portfolio-form">
          <button>Go to Portfolio Form</button>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default UsernamePage;