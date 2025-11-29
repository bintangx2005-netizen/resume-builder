import { useNavigate } from 'react-router-dom';
import React from 'react';

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4 flex flex-col">
      <button
        className="mb-2 p-2 hover:bg-gray-700 rounded"
        onClick={() => navigate('/admin')} // Admin Dashboard
      >
        Dashboard
      </button>

      

      <button
        className="mb-2 p-2 hover:bg-gray-700 rounded"
        onClick={() => navigate('/admin/users')} // User Management
      >
        User Management
      </button>
    </div>
  );
};

export default AdminSidebar;
