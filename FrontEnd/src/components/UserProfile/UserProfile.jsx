import React from 'react';
import './UserProfile.css';

function UserProfile() {
  return (
    <div className="header">
      <h1>Welcome back<br />Tony Jarvis!</h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default UserProfile;
