import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import UserPage from './pages/UserPage/UserPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
