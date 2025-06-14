import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardHome from './pages/DashboardHome';
import AssignTask from './pages/AssignTask';
import EmployeeList from './pages/EmployeeList';
import TaskStatus from './pages/TaskStatus';
import EmployeeLayout from './components/EmployeeLayout';
import EmployeeTasks from './pages/EmployeeTasks';
import EmployeeProfile from './pages/EmployeeProfile';
import EmployeeLogin from './pages/EmployeeLogin';
import Login from './pages/Login';
import { TaskProvider } from './context/TaskContext';
import './theme.css';

const RequireManager = ({ children }) => {
  if (localStorage.getItem('isManager') === 'true') return children;
  return <Navigate to="/login" replace />;
};

const RequireEmployee = ({ children }) => {
  if (localStorage.getItem('currentEmployee')) return children;
  return <Navigate to="/login" replace />;
};

const App = () => (
  <TaskProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee" element={<RequireEmployee><EmployeeLayout /></RequireEmployee>}>
          <Route path="tasks" element={<EmployeeTasks />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="logout" element={<div />} />
          <Route index element={<EmployeeTasks />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/manager" element={<RequireManager><Layout /></RequireManager>}>
          <Route index element={<DashboardHome />} />
          <Route path="assign-task" element={<AssignTask />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="task-status" element={<TaskStatus />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </TaskProvider>
);

export default App;
