import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const mockEmployees = [
  { id: 'E001', name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Developer' },
  { id: 'E002', name: 'Bob Smith', email: 'bob.smith@example.com', role: 'Designer' },
  { id: 'E003', name: 'Charlie Lee', email: 'charlie.lee@example.com', role: 'QA' },
  { id: 'E004', name: 'Diana Prince', email: 'diana.prince@example.com', role: 'Manager' },
];

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Centralize backend base URL to make it easy to change and debug
  // Vite exposes environment variables via import.meta.env and they should be prefixed with VITE_
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
  axios.defaults.baseURL = API_BASE;

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data.tasks || []);
    } catch (e) {
      // Log full error for easier debugging when backend is down
      console.error('fetchTasks failed', e?.response || e.message || e);
      setTasks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task (manager)
  const addTask = async (task) => {
    try {
      const res = await axios.post('/api/tasks', task);
      // If backend returns created task or success flag, refresh list
      if (res.status === 201 || res.status === 200) {
        await fetchTasks();
        return { ok: true, data: res.data };
      }
      // Unexpected status
      console.error('Unexpected response creating task', res.status, res.data);
      return { ok: false, error: 'unexpected_response', status: res.status };
    } catch (err) {
      // Log full error for debugging (network errors, CORS, server down)
      console.error('Failed to create task', err?.response || err.message || err);
      // Return a structured failure so callers can show messages
      return { ok: false, error: err?.response?.data || err.message || 'network_error' };
    }
  };

  // Update task status (manager manual update)
  const updateTaskStatus = async (index, newStatus) => {
    // Not implemented: for now, just update local state
    setTasks((prevTasks) => {
      const updated = [...prevTasks];
      if (updated[index]) {
        updated[index].status = newStatus;
      }
      return updated;
    });
  };

  // Employee submits work, triggers AI, backend updates status
  const submitTask = async (index, submissionText, employeeName) => {
    const task = tasks[index];
    if (!task) return { status: 'error', taskStatus: 'not_found' };
    try {
      const response = await axios.post('/api/verify-task', {
        taskDetails: task.title,
        responseDetails: submissionText,
        employee: employeeName || task.assignedTo,
      });
      await fetchTasks(); // Refresh tasks after backend update
      return response.data;
    } catch (error) {
      console.error('submitTask failed', error?.response || error.message || error);
      return { status: 'error', taskStatus: 'not_completed' };
    }
  };

  return (
    <TaskContext.Provider value={{ employees: mockEmployees, tasks, addTask, updateTaskStatus, submitTask, fetchTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
