import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BeritaForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Menyimpan berita...");

    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const response = await axios.post(
          "http://localhost:4000/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        imageUrl = response.data.url;
      }

      const slug = title.toLowerCase().replace(/\s+/g, "-");

      await addDoc(collection(db, "berita"), {
        title,
        slug,
        location,
        content,
        date: Timestamp.now(),
        image: imageUrl,
      });

      toast.success("Berita berhasil ditambahkan!", { id: loadingToast });

      navigate("/admin/berita");
    } catch (err) {
      console.error("Gagal tambah berita:", err);

      toast.error("Terjadi kesalahan saat menambahkan berita.", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[color:var(--color-brand)] mb-6">
        Tambah Berita
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
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
            required
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
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default BeritaForm;
