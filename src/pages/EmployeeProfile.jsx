import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import '../theme.css';

const EmployeeProfile = () => {
  const { employees } = useTaskContext();
  const employeeName = localStorage.getItem('currentEmployee');
  const employee = employees.find(e => e.name === employeeName);

  if (!employee) return <div className="card">No profile found.</div>;

  return (
    <div className="card" style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2 style={{ fontWeight: 700, marginBottom: 16 }}>Profile</h2>
      <div><b>Name:</b> {employee.name}</div>
      <div><b>Email:</b> {employee.email}</div>
      <div><b>Role:</b> {employee.role}</div>
      <div><b>ID:</b> {employee.id}</div>
    </div>
  );
};

export default EmployeeProfile;
