import React, { useState } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/reset-password/${token}`, {password});
      toast.success(data.message);
      window.location.href = "/";
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border rounded-2xl px-8 bg-white">
        <h1 className="text-2xl mt-10 font-medium">Reset Password</h1>
        <input type="password" placeholder="New password" className="w-full border mt-5 p-3 rounded-full"
          value={password} onChange={(e)=>setPassword(e.target.value)} required />

        <button className="w-full mt-4 h-11 rounded-full bg-green-500 text-white">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
