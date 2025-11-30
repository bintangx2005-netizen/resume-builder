import React, { useEffect, useState } from "react";
import api from "../../configs/api";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // baru

  // State untuk search dan filter
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // State untuk edit
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/api/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Session expired, silakan login ulang");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } else {
        toast.error("Gagal memuat data user");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      await api.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User berhasil dihapus");
      fetchUsers();
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Session expired, silakan login ulang");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } else {
        toast.error("Gagal menghapus user");
      }
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const payload = {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
      };

      const { data } = await api.put(
        `/api/users/${editingUser._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.token) localStorage.setItem("token", data.token);
      toast.success("User berhasil diperbarui");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Session expired, silakan login ulang");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } else {
        toast.error("Gagal update user");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  if (!isLoggedIn) {
    window.location.href = "/login"; // redirect jika token invalid
    return null;
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = filterRole === "all" ? true : u.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Cari nama atau email..."
          className="border p-2 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-40"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">Semua Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="bg-white shadow rounded p-4">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nama</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Edit</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id}>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>

                <td className="border p-2 text-center">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => setEditingUser(u)}
                  >
                    Edit
                  </button>
                </td>

                <td className="border p-2 text-center">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM UPDATE */}
      {editingUser && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Edit User</h2>

          <div className="flex flex-col gap-3">
            <input
              className="border p-2 rounded"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />

            <select
              className="border p-2 rounded"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleUpdate}
            >
              Simpan Perubahan
            </button>

            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setEditingUser(null)}
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
