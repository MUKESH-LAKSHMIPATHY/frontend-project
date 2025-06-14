import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import '../theme.css';

const Login = () => {
  const { employees } = useTaskContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Manager');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (role === 'Manager') {
      if (email.trim().toLowerCase() === 'manager@gmail.com' && password === '1234') {
        localStorage.setItem('isManager', 'true');
        localStorage.removeItem('currentEmployee');
        navigate('/manager');
      } else {
        setError('Invalid manager credentials.');
      }
    } else {
      // Employee: email must be "<Name>@gmail.com" and password 1234
      const emp = employees.find(emp =>
        email.trim().toLowerCase() === `${emp.name.replace(/\s+/g, '').toLowerCase()}@gmail.com` && password === '1234'
      );
      if (emp) {
        localStorage.setItem('currentEmployee', emp.name);
        localStorage.removeItem('isManager');
        navigate('/employee');
      } else {
        setError('Invalid employee credentials.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <form onSubmit={handleSubmit} className="elevated" style={{ padding: '2rem 3rem', minWidth: 320, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 24, fontWeight: 700, color: 'var(--primary)', textAlign: 'center' }}>Login</h2>
        {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        <label>Role:</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-accent" type="submit" style={{ width: '100%', marginTop: 16 }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
