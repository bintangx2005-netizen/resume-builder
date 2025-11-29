import React from "react";

const Unauthorized = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold text-red-600">Akses Ditolak</h1>
        <p className="mt-2 text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
