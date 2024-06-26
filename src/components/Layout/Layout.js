import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <nav className="sidebar">
        <ul>
          <li><Link to="/welcome">Welcome</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/logout">Logout</Link></li>
          <li><Link to="/add">Add Job</Link></li>
          <li><Link to="/delete">Delete Job</Link></li>
          <li><Link to="/edit">Edit Job</Link></li>
          <li><Link to="/tracker">Job Tracker</Link></li>
          {/* Remove the Snapshot Firebase link */}
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
