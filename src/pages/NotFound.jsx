import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-bold text-green-700">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 mb-6">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link 
        to="/" 
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;