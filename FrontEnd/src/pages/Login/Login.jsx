import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/authSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.username.value.trim();
    const password = event.target.password.value.trim();

    console.log('Form submitted with:', { email, password });

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      console.log('Missing email or password');
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((response) => {
        console.log('Login successful:', response);
        navigate('/profile');
        console.log('Navigation vers /profile');
      })
      .catch((err) => {
        console.error('Login failed:', err);
        setErrorMessage('Login failed. Please try again.');
      });
  };

  return (
    <div className="login-container">
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
