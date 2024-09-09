import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action asynchrone pour se connecter via l'API
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    // Envoi des informations de connexion à l'API
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);

    const token = response.data.body.token; // Stocke le token reçu
    // Configuration du token pour les appels suivants
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Utilisation de l'API /user/profile pour récupérer les informations utilisateur
    const profileResponse = await axios.post('http://localhost:3001/api/v1/user/profile', {}, config);

    // Retourne les informations utilisateur depuis la réponse de l'API
    return {
      firstName: profileResponse.data.body.firstName,
      lastName: profileResponse.data.body.lastName,
      userName: profileResponse.data.body.userName,
      token: token
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    firstName: '', // Prénom de l'utilisateur
    lastName: '',  // Nom de famille de l'utilisateur
    userName: '',  // Nom d'utilisateur
    token: null,   // Jeton d'authentification
    error: null,   // Gestion des erreurs
    loading: false, // Indicateur de chargement
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.firstName = ''; // Réinitialise le prénom à la déconnexion
      state.lastName = '';  // Réinitialise le nom à la déconnexion
      state.userName = '';  // Réinitialise le nom d'utilisateur
      state.token = null;   // Réinitialise le token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.firstName = action.payload.firstName; // Stocke le prénom
        state.lastName = action.payload.lastName;   // Stocke le nom de famille
        state.userName = action.payload.userName;   // Stocke le nom d'utilisateur
        state.token = action.payload.token;         // Stocke le token
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload.message; // En cas d'erreur
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
