import React, { createContext, useContext, useState, useEffect } from 'react';

const mockEmployees = [
  { id: 'E001', name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Developer' },
  { id: 'E002', name: 'Bob Smith', email: 'bob.smith@example.com', role: 'Designer' },
  { id: 'E003', name: 'Charlie Lee', email: 'charlie.lee@example.com', role: 'QA' },
  { id: 'E004', name: 'Diana Prince', email: 'diana.prince@example.com', role: 'Manager' },
];

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const addTask = (task) => setTasks((prev) => [...prev, task]);
  const updateTaskStatus = (index, newStatus) => {
    setTasks((prevTasks) => {
      const updated = [...prevTasks];
      if (updated[index]) {
        updated[index].status = newStatus;
      }
      return updated;
    });
  };
  const submitTask = (index, submissionText) => {
    setTasks((prevTasks) => {
      const updated = [...prevTasks];
      if (updated[index]) {
        updated[index].submission = submissionText;
      }
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ employees: mockEmployees, tasks, addTask, updateTaskStatus, submitTask }}>
      {children}
    </TaskContext.Provider>
  );
};
