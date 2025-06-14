import React, { useState, useEffect } from 'react';
import AssignedTasks from '../components/AssignedTasks';
import { useTaskContext } from '../context/TaskContext';

const EmployeeDashboard = () => {
  const { employees } = useTaskContext();
  const [selectedEmployee, setSelectedEmployee] = useState(() => {
    return localStorage.getItem('currentEmployee') || employees[0]?.name || '';
  });
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem('currentEmployee');
  });

  useEffect(() => {
    if (selectedEmployee) {
      setLoggedIn(true);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
    localStorage.setItem('currentEmployee', e.target.value);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentEmployee');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: '2rem', color: '#222', textAlign: 'center' }}>
        <h2>You are logged out.</h2>
        <p>Please select an employee to log in.</p>
        <div style={{ margin: '1rem 0' }}>
          <label htmlFor="employee-select" style={{ marginRight: '1rem' }}>Select Employee:</label>
          <select id="employee-select" value={selectedEmployee} onChange={handleChange}>
            {employees.map(emp => (
              <option key={emp.id} value={emp.name}>{emp.name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', color: '#222' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Employee Dashboard</h1>
        <button onClick={handleLogout} style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.5rem', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
      </div>
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="employee-select" style={{ marginRight: '1rem' }}>Select Employee:</label>
        <select id="employee-select" value={selectedEmployee} onChange={handleChange}>
          {employees.map(emp => (
            <option key={emp.id} value={emp.name}>{emp.name}</option>
          ))}
        </select>
      </div>
      <AssignedTasks employeeName={selectedEmployee} />
    </div>
  );
};

export default EmployeeDashboard;
