import React from 'react';
import TaskList from '../components/Tasks/TaskList';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Dashboard = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container mx-auto p-6">
        <TaskList />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
