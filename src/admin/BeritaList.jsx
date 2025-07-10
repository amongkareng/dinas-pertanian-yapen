import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const BeritaList = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      const q = query(collection(db, "berita"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBerita(data);
      setLoading(false);
    };
    fetchBerita();
  }, []);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    const loadingToast = toast.loading("Menghapus berita...");
    try {
      // Nonaktifkan sementara penghapusan gambar untuk debugging
      // if (itemToDelete.image) {
      //   const imageRef = ref(storage, itemToDelete.image);
      //   await deleteObject(imageRef).catch((error) => {
      //     if (error.code !== "storage/object-not-found") {
      //       throw error;
      //     }
      //   });
      // }
      await deleteDoc(doc(db, "berita", itemToDelete.id));
      setBerita(berita.filter((b) => b.id !== itemToDelete.id));
      toast.success("Berita berhasil dihapus!", { id: loadingToast });
    } catch (error) {
      console.error("Gagal menghapus berita:", error);
      toast.error("Gagal menghapus berita. Coba lagi.", { id: loadingToast });
    } finally {
      setShowConfirm(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Berita</h2>
        <Link
          to="/admin/berita/form"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Tambah Berita
        </Link>
      </div>

      {loading ? (
        <p>Memuat...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Judul</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {berita.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.authorName ?? "-"}</td>
                  <td className="px-4 py-2">
                    {item.date
                      ? item.date.toDate().toLocaleDateString("id-ID")
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 space-x-4">
                    <Link
                      to={`/admin/edit-berita/${item.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Penghapusan</h3>
            <p>
              Apakah Anda yakin ingin menghapus berita berjudul{" "}
              <span className="font-bold">"{itemToDelete?.title}"</span>?
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              {/* 👇 PERBAIKAN ADA DI BARIS INI 👇 */}
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeritaList;
