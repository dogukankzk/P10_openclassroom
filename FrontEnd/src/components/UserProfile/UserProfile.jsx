import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserName } from '../../store/authSlice';
import './UserProfile.css';

function UserProfile() {
  const dispatch = useDispatch();
  
  // Récupère les informations utilisateur depuis le store Redux
  const firstNameFromStore = useSelector((state) => state.auth.firstName);
  const lastNameFromStore = useSelector((state) => state.auth.lastName);
  const userNameFromStore = useSelector((state) => state.auth.userName);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(userNameFromStore); // Utilise le nom d'utilisateur du store

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    dispatch(updateUserName(userName)); // Envoie le nouveau nom d'utilisateur à l'API
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUserName(userNameFromStore); // Réinitialise les valeurs au userName du store
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
              value={firstNameFromStore}
              disabled // Rend le champ non modifiable
              className="disabled-input" // Classe CSS pour appliquer le style grisé
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastNameFromStore}
              disabled // Rend le champ non modifiable
              className="disabled-input" // Classe CSS pour appliquer le style grisé
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        </form>
      ) : (
        <>
          <h1>Welcome back<br />{userName}!</h1>
          <button className="edit-button" onClick={handleEditClick}>Edit user info</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
