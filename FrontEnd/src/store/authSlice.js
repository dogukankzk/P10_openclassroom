import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action asynchrone pour se connecter via l'API
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);
    const token = response.data.body.token;
    
    // Récupère les informations utilisateur
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const profileResponse = await axios.post('http://localhost:3001/api/v1/user/profile', {}, config);

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

// Action asynchrone pour mettre à jour le `userName`
export const updateUserName = createAsyncThunk('auth/updateUserName', async (newUserName, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', { userName: newUserName }, config);

    return response.data.body.userName; // Retourne le nouveau `userName`
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    firstName: '',
    lastName: '',
    userName: '',
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.firstName = '';
      state.lastName = '';
      state.userName = '';
      state.token = null;
      localStorage.removeItem('auth'); // Suppression des informations du localStorage lors du logout

    },
    restoreSession: (state, action) => {
      state.isAuthenticated = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userName = action.payload.userName;
        state.token = action.payload.token;
        state.loading = false;
        localStorage.setItem('auth', JSON.stringify(state));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.userName = action.payload;
        localStorage.setItem('auth', JSON.stringify(state)); // Met à jour le `localStorage`
      });
  },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
