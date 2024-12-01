import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
  });

  const fetchTaskDetails = async () => {
    try {
      const { data } = await API.get(`/tasks/${id}`);
      setTask(data);
      setFormData({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: data.status,
      });
    } catch (err) {
      console.error(err.response?.data?.error || 'Error fetching task details');
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tasks/${id}`, formData);
      alert('Task updated successfully');
      setEditing(false);
      fetchTaskDetails();
    } catch (err) {
      console.error(err.response?.data?.error || 'Error updating task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        alert('Task deleted successfully');
        navigate('/dashboard'); // Navigate to dashboard on success
      } catch (err) {
        console.error(err.response?.data?.error || 'Error deleting task');
      }
    }
  };

  if (!task) return <p>Loading task details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>
      {editing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate.slice(0, 10)}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
        </div>
      )}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleEditToggle}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          {editing ? 'Cancel Edit' : 'Edit Task'}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
