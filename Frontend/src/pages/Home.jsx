import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Task Management System</h1>
        <div>
          <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded">Login</Link>
          <Link to="/register" className="bg-blue-500 text-white py-2 px-4 rounded ml-4">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
