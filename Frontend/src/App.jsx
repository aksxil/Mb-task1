import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreateTask from './components/Tasks/CreateTask';
import TaskList from './components/Tasks/TaskList';
import TaskDetails from './components/Tasks/TaskDetails';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Auth/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute>
                <TaskDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
