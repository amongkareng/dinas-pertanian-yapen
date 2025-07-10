// src/pages/NewsDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        const q = query(collection(db, "berita"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setNotFound(true);
        } else {
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
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen text-center py-20">Memuat berita...</div>;
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-lg text-gray-600">Berita tidak ditemukan.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Kembali
        </button>
      </div>
    );
  }

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
        {/* 👇 PERUBAHAN HANYA DI BARIS INI 👇 */}
        <p className="text-sm text-gray-500">
          {berita.date.toDate().toLocaleDateString("id-ID", {
            year: "numeric", month: "long", day: "numeric"
          })}
          {berita.location && ` • ${berita.location}`}
          {berita.authorName && ` • Oleh: ${berita.authorName}`}
        </p>

        {berita.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </main>
  );
};

export default NewsDetail;