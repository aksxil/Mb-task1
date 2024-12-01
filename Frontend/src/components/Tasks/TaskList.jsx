import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      
      // Ensure `data` is an array and filter out null or invalid entries
      const validTasks = Array.isArray(data) ? data.filter(task => task && task._id) : [];
      
      setTasks(validTasks);
      if (validTasks.length === 0) {
        setError('No tasks found or invalid data.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-300';
      case 'Medium':
        return 'bg-yellow-300';
      case 'Low':
        return 'bg-green-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`p-4 border rounded hover:shadow-md ${getPriorityColor(
                task.priority
              )}`}
            >
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Status: {task.status}</p>
              <p>
                <strong>Priority:</strong> {task.priority}
              </p>
              <Link
                to={`/tasks/${task._id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
