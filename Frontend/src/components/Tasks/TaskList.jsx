import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error(err.response?.data?.error || 'Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to determine background color based on task priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-300';  // Red for High priority
      case 'Medium':
        return 'bg-yellow-300';  // Yellow for Medium priority
      case 'Low':
        return 'bg-green-300';  // Green for Low priority
      default:
        return 'bg-gray-300';  // Default if no priority is set
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 border rounded bg-gray-50 hover:shadow-md ${getPriorityColor(task.priority)}`}
          >
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Status: {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <Link
              to={`/tasks/${task._id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
