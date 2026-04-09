import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Saved from './pages/Saved';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/event/:id"
            element={user ? <EventDetail /> : <Navigate to="/login" />}
          />
          <Route
            path="/saved"
            element={user ? <Saved /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;