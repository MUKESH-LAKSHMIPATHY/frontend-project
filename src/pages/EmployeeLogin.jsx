import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import '../theme.css';

const EmployeeLogin = () => {
  const { employees } = useTaskContext();
  const [selected, setSelected] = useState(employees[0]?.name || '');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('currentEmployee', selected);
    navigate('/employee/tasks');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <form onSubmit={handleLogin} className="elevated" style={{ minWidth: 320, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 24, fontWeight: 700, color: 'var(--primary)', textAlign: 'center' }}>Employee Login</h2>
        <label htmlFor="employee-select">Select Employee:</label>
        <select id="employee-select" value={selected} onChange={e => setSelected(e.target.value)}>
          {employees.map(emp => (
            <option key={emp.id} value={emp.name}>{emp.name}</option>
          ))}
        </select>
        <button className="btn btn-accent" type="submit" style={{ width: '100%', marginTop: 16 }}>Login</button>
      </form>
    </div>
  );
};

export default EmployeeLogin;
