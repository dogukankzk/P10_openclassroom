import { configureStore } from '@reduxjs/toolkit';
import authReducer, { restoreSession } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Récupération des informations de session à partir du localStorage
const authData = JSON.parse(localStorage.getItem('auth'));
if (authData) {
  store.dispatch(restoreSession(authData)); // Restaure la session utilisateur
}

export default store;
