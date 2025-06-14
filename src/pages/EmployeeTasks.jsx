import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useOutletContext } from 'react-router-dom';
import '../theme.css';

const AssignedTasks = () => {
  const { tasks, updateTaskStatus, submitTask } = useTaskContext();
  const { employeeName } = useOutletContext();
  const [submissions, setSubmissions] = useState({});

  const myTasks = tasks.filter(task => task.assignedTo === employeeName);

  const handleStatusChange = (taskIdx) => {
    const updated = prompt("Update status (e.g. Completed, Not Completed)");
    if (updated) {
      const globalIndex = tasks.findIndex(
        t => t.assignedTo === employeeName && t.title === myTasks[taskIdx].title && t.date === myTasks[taskIdx].date
      );
      if (globalIndex !== -1) {
        updateTaskStatus(globalIndex, updated.trim());
      }
    }
  };

  const handleSubmission = (taskIdx) => {
    const globalIndex = tasks.findIndex(
      t => t.assignedTo === employeeName && t.title === myTasks[taskIdx].title && t.date === myTasks[taskIdx].date
    );
    if (globalIndex !== -1 && submissions[taskIdx]) {
      submitTask(globalIndex, submissions[taskIdx]);
      setSubmissions({ ...submissions, [taskIdx]: '' });
    }
  };

  const handleChange = (taskIdx, value) => {
    setSubmissions({ ...submissions, [taskIdx]: value });
  };

  return (
    <div style={{ marginTop: '2rem', color: 'var(--text-main)' }}>
      <h2 style={{ fontSize: '1.7rem', marginBottom: '1.5rem', color: 'var(--primary)', fontWeight: 700 }}>My Tasks</h2>
      {myTasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Update</th>
                <th>Submit Task</th>
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
                    <button className="btn" onClick={() => handleStatusChange(index)}>
                      Update
                    </button>
                  </td>
                  <td style={{ minWidth: 180 }}>
                    <textarea
                      className="textarea"
                      value={submissions[index] || task.submission || ''}
                      onChange={e => handleChange(index, e.target.value)}
                      rows={2}
                      placeholder="Enter your work..."
                    />
                    <button className="btn btn-accent" onClick={() => handleSubmission(index)}>
                      Submit
                    </button>
                    {task.submission && <div style={{ color: '#388e3c', fontSize: 13, marginTop: 4, fontWeight: 500 }}>Submitted</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedTasks;
