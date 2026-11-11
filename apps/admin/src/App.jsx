import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './pages/Login';

import Dashboard from './pages/Dashboard';

import Projects from './pages/Projects';

import Testimonials from './pages/Testimonials';

import CMS from './pages/CMS';

import Settings from './pages/Settings';

import Contacts from './pages/Contacts';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* Testimonials */}
        <Route
          path="/testimonials"
          element={
            <ProtectedRoute>
              <Testimonials />
            </ProtectedRoute>
          }
        />

        {/* CMS */}
        <Route
          path="/cms"
          element={
            <ProtectedRoute>
              <CMS />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Contacts */}
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;