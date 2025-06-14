import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const AssignedTasks = ({ employeeName }) => {
  const { tasks, updateTaskStatus } = useTaskContext();

  const myTasks = tasks.filter(task => task.assignedTo === employeeName);

  const handleStatusChange = (taskIdx) => {
    const updated = prompt("Update status (e.g. Completed, Not Completed)");
    if (updated) {
      // Find the index of the task in the global tasks array
      const globalIndex = tasks.findIndex(
        t => t.assignedTo === employeeName && t.title === myTasks[taskIdx].title && t.date === myTasks[taskIdx].date
      );
      if (globalIndex !== -1) {
        updateTaskStatus(globalIndex, updated.trim());
      }
    }
  };

  return (
    <div style={{ marginTop: '2rem', color: '#222' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#222' }}>My Tasks</h2>
      {myTasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#222' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.date}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => handleStatusChange(index)} style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 2rem', fontWeight: 'bold', cursor: 'pointer' }}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignedTasks;
