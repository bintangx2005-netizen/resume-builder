import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users" className="hover:text-gray-300">User Management</Link>
        </li>
      </ul>
    </div>
  );
}
