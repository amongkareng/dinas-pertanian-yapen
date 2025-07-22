// src/pages/News.jsx

import React, { useEffect, useState } from "react";
import aos from "aos";
import "aos/dist/aos.css";
import NewsCard from "../components/NewsCard";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const News = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  // 1. Tambahkan state untuk menyimpan teks pencarian
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    aos.init({ duration: 1000, delay: 100, once: true });

    const fetchData = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "berita"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBerita(data);
      } catch (err) {
        console.error("Gagal mengambil berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Tambahkan logika untuk memfilter berita berdasarkan judul
  const filteredBerita = berita.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <main className="container py-16">
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-bold text-center mb-8"
        >
          Berita & Kegiatan
        </h1>

        {/* 3. Tambahkan elemen input untuk search bar */}
        <div className="mb-12 max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="100">
          <input
            type="text"
            placeholder="Cari berita berdasarkan judul..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 4. Ubah logika render untuk menggunakan data yang sudah difilter */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton height={192} />
                  <div className="p-4">
                    <Skeleton count={2} style={{ marginBottom: '0.75rem' }}/>
                    <Skeleton height={20} width="80%" />
                  </div>
                </div>
              ))}
          </div>
        ) : filteredBerita.length === 0 ? (
          <p className="text-center text-gray-500">
            {searchTerm 
              ? "Berita yang Anda cari tidak ditemukan." 
              : "Belum ada berita."
            }
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBerita.map((item, index) => (
              <NewsCard
                key={item.id}
                {...item}
                dataAosDelay={index * 100}
              />
            ))}
          </div>
        )}
      </main>
    </SkeletonTheme>
  );
};

export default News;