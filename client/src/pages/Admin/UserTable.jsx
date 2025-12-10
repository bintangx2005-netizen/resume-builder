import React from "react";

const UserTable = ({ users, setEditingUser, handleDelete }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Role</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.role}</td>

            <td className="border p-2 flex gap-2">
              <button
                onClick={() => setEditingUser(user)}
                className="px-2 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(user._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

        {users.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center py-4">
              Tidak ada user ditemukan
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
