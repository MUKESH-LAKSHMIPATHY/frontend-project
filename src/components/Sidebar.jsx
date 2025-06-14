import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../theme.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('isManager');
    navigate('/login');
  };
  return (
    <aside className="sidebar">
      <NavLink
        to="/manager"
        end
        className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/manager/assign-task"
        className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
      >
        Assign Task
      </NavLink>
      <NavLink
        to="/manager/employees"
        className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
      >
        View Employees
      </NavLink>
      <NavLink
        to="/manager/task-status"
        className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
      >
        Task Status
      </NavLink>
      <a href="#" className="sidebar-link" onClick={handleLogout}>
        Logout
      </a>
    </aside>
  );
};

export default Sidebar;
