import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec le store Redux
import './UserProfile.css';

function UserProfile() {
  const dispatch = useDispatch();
  
  // Récupère le prénom et le nom depuis le store Redux
  const firstNameFromStore = useSelector((state) => state.auth.firstName);
  const lastNameFromStore = useSelector((state) => state.auth.lastName);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(firstNameFromStore); // Utilise le prénom du store
  const [lastName, setLastName] = useState(lastNameFromStore); // Utilise le nom du store

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    
    // Ici, tu peux envoyer les changements au store Redux ou à l'API pour sauvegarder les modifications
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFirstName(firstNameFromStore); // Réinitialise les valeurs au prénom et nom du store
    setLastName(lastNameFromStore);
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
