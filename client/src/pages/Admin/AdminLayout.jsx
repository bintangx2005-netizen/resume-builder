import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../Components/Admin/AdminSidebar';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // arahkan ke landing page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Tombol ke landing page */}
        <div className="p-4 bg-white shadow flex justify-end">
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Go to Landing Page
          </button>
        </div>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
