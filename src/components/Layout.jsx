import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import '../theme.css';

const Layout = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '3.5rem 2rem 2rem 2rem' }}>
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
