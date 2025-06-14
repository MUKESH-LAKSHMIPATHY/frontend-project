import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import '../theme.css';

const EmployeeList = () => {
  const { employees, tasks } = useTaskContext();

  return (
    <div className="elevated" style={{ maxWidth: 900, margin: '2rem auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem', color: 'var(--primary)' }}>Employee List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Total Tasks Assigned</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>{tasks.filter(t => t.assignedTo === emp.name).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
