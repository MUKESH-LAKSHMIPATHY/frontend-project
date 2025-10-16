import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import '../theme.css';

const AssignTask = () => {
  const { employees, addTask } = useTaskContext();
  const [form, setForm] = useState({
    employee: '',
    title: '',
    description: '',
    dueDate: '',
  });
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const selectedEmployee = employees.find((emp) => emp.name === form.employee);
    if (!selectedEmployee) {
      setErrorMsg('Please select a valid employee');
      return;
    }

    setSubmitting(true);
    const result = await addTask({
      title: form.title.trim(),
      assignedTo: selectedEmployee.name.trim(),
      description: form.description.trim(),
      date: form.dueDate,
      status: 'In Progress',
    });
    setSubmitting(false);

    if (!result || !result.ok) {
      const msg = (result && (result.error?.message || result.error)) || 'Failed to assign task';
      setErrorMsg(typeof msg === 'string' ? msg : JSON.stringify(msg));
      return;
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    setForm({ employee: '', title: '', description: '', dueDate: '' });
  };

  return (
    <div className="elevated" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem' }}>
      <h2 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 24 }}>Assign Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Employee</label>
        <select name="employee" value={form.employee} onChange={handleChange} required>
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.name}>
              {emp.name}
            </option>
          ))}
        </select>

        <label>Task Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter task description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="textarea"
        />

        <label>Due Date</label>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />

        <button className="btn btn-accent" type="submit" style={{ width: '100%', marginTop: 16 }} disabled={submitting}>
          {submitting ? 'Assigning...' : 'Assign Task'}
        </button>
      </form>

      {errorMsg && (
        <div
          style={{
            marginTop: '1rem',
            background: '#fed7d7',
            color: '#742a2a',
            padding: '1rem',
            borderRadius: 8,
            textAlign: 'center',
            fontWeight: 500,
            boxShadow: '0 1px 4px rgba(220,38,38,0.08)',
          }}
        >
          {errorMsg}
        </div>
      )}

      {success && (
        <div
          style={{
            marginTop: '1.5rem',
            background: '#c6f6d5',
            color: '#22543d',
            padding: '1rem',
            borderRadius: 8,
            textAlign: 'center',
            fontWeight: 500,
            boxShadow: '0 1px 4px rgba(72,187,120,0.08)',
          }}
        >
          Task assigned successfully!
        </div>
      )}
    </div>
  );
};

export default AssignTask;
