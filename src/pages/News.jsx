// src/pages/News.jsx

import React, { useEffect, useState } from "react";
import aos from "aos";
import "aos/dist/aos.css";
import NewsCard from "../components/NewsCard";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

// 1. Import Skeleton dan CSS-nya
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const News = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... (useEffect Anda yang lain tetap sama)
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

  return (
    // 2. Bungkus semuanya dengan SkeletonTheme untuk warna yang konsisten
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <main className="container py-16">
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          Berita
        </h1>

        {/* 3. Ubah bagian loading */}
        {loading ? (
          // Tampilkan 6 kerangka kartu saat loading
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton height={192} /> {/* Kerangka untuk gambar */}
                  <div className="p-4">
                    <Skeleton count={2} style={{ marginBottom: '0.5rem' }}/> {/* Kerangka untuk tanggal & judul */}
                    <Skeleton height={20} width="80%" /> {/* Kerangka untuk judul */}
                  </div>
                </div>
              ))}
          </div>
        ) : berita.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada berita.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.map((item, index) => (
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