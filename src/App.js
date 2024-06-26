import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/auth';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Add from './components/Add/Add';
import Delete from './components/Delete/Delete';
import Edit from './components/Edit/Edit';
import JobTracker from './components/JobTracker/JobTracker';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="logout" element={<Logout />} />
            <Route path="add" element={<Add />} />
            <Route path="delete" element={<Delete />} />
            <Route path="edit" element={<Edit />} />
            <Route path="tracker" element={<JobTracker />} />
            <Route path="/" element={<Navigate to="/welcome" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
