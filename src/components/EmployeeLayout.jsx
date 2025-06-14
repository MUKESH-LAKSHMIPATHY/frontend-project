import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeNavbar from './EmployeeNavbar';
import { useTaskContext } from '../context/TaskContext';
import '../theme.css';

const EmployeeLayout = () => {
  const { employees } = useTaskContext();
  const [employeeName, setEmployeeName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('currentEmployee');
    if (stored) setEmployeeName(stored);
    else navigate('/employee/login');
  }, [navigate]);

  // Handle logout route
  useEffect(() => {
    if (location.pathname === '/employee/logout') {
      localStorage.removeItem('currentEmployee');
      navigate('/employee/login');
    }
  }, [location, navigate]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <EmployeeSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <EmployeeNavbar employeeName={employeeName} />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Outlet context={{ employeeName }} />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
