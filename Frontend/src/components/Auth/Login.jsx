import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api'; // Import your API instance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before login attempt

    try {
      // Make POST request to /auth/login
      const response = await API.post('/auth/login', { email, password });

      // Save token to localStorage
      localStorage.setItem('authToken', response.data.token);

      alert('Login successful!');
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      console.error('Error logging in:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
