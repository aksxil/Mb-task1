import React, { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', priority: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', formData);
      navigate('/dashboard'); // Redirect to dashboard after task is created
    } catch (err) {
      console.error(err.response?.data?.error || 'Failed to create task');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
