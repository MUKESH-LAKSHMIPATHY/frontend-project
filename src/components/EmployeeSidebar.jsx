import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../theme.css';

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('currentEmployee');
    navigate('/login');
  };
  return (
    <aside className="sidebar">
      <NavLink to="/employee/tasks" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
        My Tasks
      </NavLink>
      <NavLink to="/employee/profile" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
        Profile
      </NavLink>
      <a href="#" className="sidebar-link" onClick={handleLogout}>
        Logout
      </a>
    </aside>
  );
};

export default EmployeeSidebar;
