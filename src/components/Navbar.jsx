import React from 'react';
import '../theme.css';

// Simple SVG bell icon (Heroicons style)
const BellIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width={size}
    height={size}
    style={{ display: 'block' }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a2.25 2.25 0 01-4.714 0M6.75 8.25a5.25 5.25 0 1110.5 0c0 1.172.26 2.318.764 3.367.37.77.486 1.654.34 2.5l-.084.48a2.25 2.25 0 01-2.21 1.903H7.94a2.25 2.25 0 01-2.21-1.903l-.084-.48a3.75 3.75 0 01.34-2.5A7.478 7.478 0 006.75 8.25z"
    />
  </svg>
);

const Navbar = () => {
  return (
    <header
      className="navbar"
      style={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '64px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 1100,
        borderRadius: 0,
        margin: 0,
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2d3748' }}>
        Welcome, Manager
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            color: '#4a5568',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Notifications"
        >
          <BellIcon size={26} />
        </button>
        <div
          className="profile-circle"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#2d3748',
            fontSize: '1.1rem',
          }}
        >
          M
        </div>
      </div>
    </header>
  );
};

export default Navbar;
