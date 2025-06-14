import React from 'react';
import '../theme.css';

const stats = [
  { label: 'Total Employees', value: 42 },
  { label: 'Tasks Assigned', value: 120 },
  { label: 'Tasks Completed', value: 95 },
  { label: 'Tasks Pending', value: 25 },
];

const DashboardHome = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    }}>
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <h3>{stat.label}</h3>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--primary)' }}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardHome;
