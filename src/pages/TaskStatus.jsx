import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import '../theme.css';

const statusColor = {
  Completed: { background: '#c6f6d5', color: '#22543d' },
  'In Progress': { background: '#fefcbf', color: '#975a16' },
  'Not Completed': { background: '#fed7d7', color: '#9b2c2c' },
  'Time Limit Crossed': { background: '#e2e8f0', color: '#4a5568' },
};

// helper to normalize older status values
const normalizeStatusLabel = (status) => {
  if (!status) return status;
  if (status === 'On Working') return 'In Progress';
  return status;
};

// Backend verification statuses returned by Flask/Gemini
const backendColor = {
  completed: { background: '#c6f6d5', color: '#22543d' },
  not_completed: { background: '#fed7d7', color: '#9b2c2c' },
  error: { background: '#fbe4e6', color: '#9b2c2c' },
  unknown: { background: '#f0f4f8', color: '#4a5568' },
};

const TaskStatus = () => {
  const { tasks, fetchTasks, loading } = useTaskContext();

  const getEffectiveStatus = (task) => {
    const backend = (task.backendStatus || '').toLowerCase();
    // Completed: show Submitted (top) then Completed (bottom)
    if (backend === 'completed') return {
      top: { label: 'Submitted', style: backendColor.completed },
      bottom: { label: 'Completed', style: backendColor.completed }
    };
    // Not completed: show In Progress (top) then not completed (bottom)
    if (backend === 'not_completed') return {
      top: { label: 'In Progress', style: statusColor['In Progress'] },
      bottom: { label: 'not completed', style: backendColor.not_completed }
    };
    // Error: show In Progress and error
    if (backend === 'error') return {
      top: { label: 'In Progress', style: statusColor['In Progress'] },
      bottom: { label: 'error', style: backendColor.error }
    };

    // Fallback: no backend verdict yet
    if (task.submission) {
      return {
        top: { label: 'Submitted', style: backendColor.unknown },
        bottom: { label: 'not verified', style: backendColor.unknown }
      };
    }

    // No submission yet - show manager status as top and 'Not Submitted' bottom
    const normalized = normalizeStatusLabel(task.status) || task.status || 'In Progress';
    return {
      top: { label: normalized, style: statusColor[normalized] || statusColor['In Progress'] },
      bottom: { label: 'Not Submitted', style: backendColor.unknown }
    };
  };

  return (
    <div className="elevated" style={{ maxWidth: 900, margin: '2rem auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem', color: 'var(--primary)' }}>Task Status</h2>
      <button onClick={fetchTasks} disabled={loading} style={{ marginBottom: '1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
        {loading ? 'Refreshing...' : 'Refresh Tasks'}
      </button>
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
              <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                {(() => {
                  const eff = getEffectiveStatus(task);
                  const topStyle = (eff.top && eff.top.style) || statusColor['In Progress'];
                  const bottomStyle = (eff.bottom && eff.bottom.style) || backendColor.unknown;
                  return (
                    <>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.5em 1.5em',
                        borderRadius: 999,
                        fontWeight: 600,
                        fontSize: '1em',
                        ...topStyle,
                      }}>
                        {eff.top?.label}
                      </span>

                      <span style={{
                        display: 'inline-block',
                        padding: '0.4em 1em',
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: '0.9em',
                        marginTop: 6,
                        ...bottomStyle,
                      }}>
                        {eff.bottom?.label}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskStatus;
