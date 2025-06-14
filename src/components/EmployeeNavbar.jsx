import React from 'react';
import '../theme.css';

const EmployeeNavbar = ({ employeeName }) => (
  <nav className="navbar">
    <span style={{ fontSize: '1.3rem', color: '#222' }}>Welcome, {employeeName || 'Employee'}</span>
    <span className="profile-circle">{employeeName ? employeeName[0] : 'E'}</span>
  </nav>
);

export default EmployeeNavbar;
