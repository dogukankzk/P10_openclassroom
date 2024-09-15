import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/authSlice';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // État pour les messages d'erreur
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Veuillez entrer à la fois un email et un mot de passe');
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log('Connexion réussie:', result);
      navigate('/profile');
    } catch (error) {
      // Affiche un message d'erreur si l'email ou le mot de passe est incorrect
      if (error.message === 'Error: User not found!' || error.message === 'Error: Incorrect password!') {
        setError('Email ou mot de passe incorrect. Veuillez réessayer.');
      } else {
        setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
      }
      console.error('Échec de la connexion:', error);
    }
  };

  return (
    <div className="login-container">
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">remember me</label>
            </div>
            {error && <p className="error-message">{error}</p>} {/* Affiche le message d'erreur */}
            <button className="sign-in-button" type="submit">Sign in</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;
