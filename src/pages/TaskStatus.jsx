import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import '../theme.css';

const statusColor = {
  Completed: { background: '#c6f6d5', color: '#22543d' },
  'On Working': { background: '#fefcbf', color: '#975a16' },
  'Not Completed': { background: '#fed7d7', color: '#9b2c2c' },
  'Time Limit Crossed': { background: '#e2e8f0', color: '#4a5568' },
};

const TaskStatus = () => {
  const { tasks } = useTaskContext();

  return (
    <div className="elevated" style={{ maxWidth: 900, margin: '2rem auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem', color: 'var(--primary)' }}>Task Status</h2>
      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>No tasks assigned yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {tasks.map((task, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
              <div style={{ flex: 2 }}>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#2d3748' }}>{task.title || '-'}</div>
                <div style={{ color: '#4a5568', marginTop: 4 }}>Assigned to: <b>{task.assignedTo || '-'}</b></div>
                <div style={{ color: '#4a5568', marginTop: 4 }}>Description: {task.description || '-'}</div>
                <div style={{ color: '#4a5568', marginTop: 4 }}>Due: {task.date || '-'}</div>
                {task.submission && (
                  <div style={{ color: '#1976d2', marginTop: 8, background: '#e3f2fd', padding: '0.5rem 1rem', borderRadius: 8 }}>
                    <b>Submission:</b> {task.submission}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.5em 1.5em',
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: '1em',
                  ...statusColor[task.status],
                }}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskStatus;
