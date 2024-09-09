import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  const firstName = useSelector((state) => state.auth.firstName); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img src="/img_copy/argentBankLogo.png" alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            {/* Afficher le prénom de l'utilisateur connecté */}
            <i className="fa fa-user-circle user-circle-out"></i>
            <span className="main-nav-item username"> {firstName}</span>
            <Link className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
