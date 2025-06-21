import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

const Dashboard = () => {
  const [jumlahBerita, setJumlahBerita] = useState(0);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const snapshot = await getDocs(collection(db, "berita"));
        setJumlahBerita(snapshot.size);
      } catch (err) {
        console.error("Gagal mengambil data berita", err);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[color:var(--color-brand)]">
        Selamat Datang, Admin!
      </h1>

      <div className="bg-white rounded shadow p-6 max-w-sm">
        <h2 className="text-lg font-semibold mb-2">Data Berita</h2>
        <p className="text-3xl font-bold text-orange-500">{jumlahBerita}</p>
        <p className="text-sm text-gray-500 mt-1">Total Berita Saat Ini</p>
      </div>
    </div>
  );
};

export default Dashboard;
