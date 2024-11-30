import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update login status when component mounts or token changes
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token
    setIsLoggedIn(false); // Update state
    alert('Logged out successfully');
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Link */}
        <Link to="/" className="text-lg font-bold">
          Task Manager
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/create-task" className="hover:underline">
                Create Task
              </Link>
              <Link to="/tasks" className="hover:underline">
                Tasks
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
