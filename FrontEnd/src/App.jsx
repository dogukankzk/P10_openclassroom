import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import UserPage from './pages/UserPage/UserPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './components/Header/Header.css';
import './components/Footer/Footer.css';

function App() {
  return (
    <Router>
      <Header /> {/* Le header est en dehors des Routes */}
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
      <Footer /> {/* Le footer est en dehors des Routes */}
    </Router>
  );
}

export default App;
