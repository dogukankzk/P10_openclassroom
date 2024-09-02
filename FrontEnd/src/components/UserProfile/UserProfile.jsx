import { useState } from 'react';
import './UserProfile.css';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Tony');
  const [lastName, setLastName] = useState('Jarvis');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Ici tu pourrais ajouter la logique pour sauvegarder les changements (API call par exemple)
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="header">
      {isEditing ? (
        <form className="edit-profile-form" onSubmit={handleSaveClick}>
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        </form>
      ) : (
        <>
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
