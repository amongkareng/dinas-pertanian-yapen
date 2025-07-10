// File: BeritaForm.jsx

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // <-- 1. Impor hook useAuth

const BeritaForm = () => {
  const { currentUser } = useAuth(); // <-- 2. Dapatkan data pengguna yang sedang login
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBeritaById = async () => {
        const docRef = doc(db, "berita", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setLocation(data.location);
          setContent(data.content);
          setPreview(data.image);
        } else {
          toast.error("Berita tidak ditemukan!");
          navigate("/admin/berita");
        }
      };
      fetchBeritaById();
    }
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // <-- 3. Pastikan ada pengguna yang login sebelum menyimpan
    if (!currentUser) {
      toast.error("Anda harus login untuk menyimpan berita.");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading(
      id ? "Memperbarui berita..." : "Menyimpan berita..."
    );

    try {
      let imageUrl = preview;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const response = await axios.post(
          "http://localhost:4000/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = response.data.url;
      }

      const slug = title.toLowerCase().replace(/\s+/g, "-");

      // <-- 4. Tambahkan data author ke objek yang akan disimpan
      const dataToSave = {
        title,
        slug,
        location,
        content,
        image: imageUrl,
        authorId: currentUser.uid, // Simpan ID author
        authorName: currentUser.displayName, // Simpan Nama author
      };

      if (id) {
        const docRef = doc(db, "berita", id);
        await updateDoc(docRef, {
          ...dataToSave,
          updatedAt: Timestamp.now(),
        });
        toast.success("Berita berhasil diperbarui!", { id: loadingToast });
      } else {
        await addDoc(collection(db, "berita"), {
          ...dataToSave,
          date: Timestamp.now(),
        });
        toast.success("Berita berhasil ditambahkan!", { id: loadingToast });
      }

      navigate("/admin/berita");
    } catch (err) {
      console.error("Gagal menyimpan berita:", err);
      toast.error("Terjadi kesalahan saat menyimpan berita.", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[color:var(--color-brand)] mb-6">
        {id ? "Edit Berita" : "Tambah Berita"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ... Form tidak berubah ... */}
        <div>
          <label className="block mb-1 font-medium">Judul</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Lokasi</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Isi Berita</label>
          <textarea
            className="w-full border px-4 py-2 rounded h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full block border border-gray-300 rounded p-2 bg-white"
            required={!id}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 rounded shadow-md w-60 h-auto object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[color:var(--color-brand)] text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Menyimpan..." : id ? "Simpan Perubahan" : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default BeritaForm;
