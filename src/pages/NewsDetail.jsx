// src/pages/NewsDetail.jsx (Versi Final yang Benar)

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const NewsDetail = () => {
  const { slug } = useParams(); // Mengambil 'bawang' dari URL /news/bawang
  const navigate = useNavigate();

  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        // 1. Membuat query: cari di koleksi 'berita' dimana field 'slug' sama dengan slug dari URL
        const q = query(collection(db, "berita"), where("slug", "==", slug));
        
        // 2. Eksekusi query
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // 3. Jika tidak ada dokumen yang cocok
          console.log("Tidak ada dokumen yang ditemukan dengan slug:", slug);
          setNotFound(true);
        } else {
          // 4. Jika ada, ambil data dari dokumen pertama yang ditemukan
          const docData = querySnapshot.docs[0].data();
          setBerita({ id: querySnapshot.docs[0].id, ...docData });
        }
      } catch (error) {
        console.error("Error mengambil detail berita:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBeritaDetail();
  }, [slug]); // Efek ini akan berjalan lagi jika slug di URL berubah

  // Tampilan saat loading
  if (loading) {
    return <div className="min-h-screen text-center py-20">Memuat berita...</div>;
  }

  // Tampilan jika berita tidak ditemukan
  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-lg text-gray-600">Berita tidak ditemukan.</p>
        <button
          onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Kembali
        </button>
      </div>
    );
  }

  // Tampilan jika berita berhasil ditemukan
  return (
    <main className="container py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        {berita.title}
      </h1>
      <img
        src={berita.image}
        alt={berita.title}
        className="w-full max-w-3xl mx-auto rounded-lg shadow-md mb-8 object-cover"
      />
      <div className="max-w-3xl mx-auto space-y-4 text-gray-800 text-justify">
        <p className="text-sm text-gray-500">
          {berita.date.toDate().toLocaleDateString("id-ID", {
            year: "numeric", month: "long", day: "numeric"
          })} &bull; {berita.location}
        </p>
        {/* Untuk menampilkan paragraf dengan benar, kita bisa split berdasarkan newline */}
        {berita.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </main>
  );
};

export default NewsDetail;