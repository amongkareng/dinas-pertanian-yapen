import React, { useState } from "react";
// v-- 1. Impor fungsi dan variabel yang kita butuhkan dari Firebase --v
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; // Pastikan db diimpor dari file firebase config Anda
// ^-- Impor selesai --^
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { FiUser, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import logo from "../assets/logo_dinas.svg";

const Register = () => {
  // v-- 2. Tambahkan state baru untuk menyimpan nama lengkap --v
  const [displayName, setDisplayName] = useState("");
  // ^-- State baru ditambahkan --^
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // v-- 3. Modifikasi fungsi handleRegister --v
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok!");
      return;
    }
    // Validasi nama tidak boleh kosong
    if (!displayName.trim()) {
        toast.error("Nama Lengkap tidak boleh kosong!");
        return;
    }

    setLoading(true);
    const auth = getAuth();
    const loadingToast = toast.loading("Membuat akun...");

    try {
      // Langkah A: Buat pengguna di Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Langkah B: Simpan data profil pengguna ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName,
        email: user.email,
        role: "admin", // Otomatis beri peran admin
        createdAt: Timestamp.now(),
      });
      
      toast.success("Akun berhasil dibuat! Silakan login.", {
        id: loadingToast,
      });
      navigate("/admin/login");

    } catch (err) {
      let errorMessage = "Pendaftaran gagal. Coba lagi.";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email ini sudah terdaftar.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password terlalu lemah. Minimal 6 karakter.";
      }
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };
  // ^-- Fungsi handleRegister selesai dimodifikasi --^

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-800 hover:text-green-700 transition-colors z-10 flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          <FiArrowLeft />
          <span>Beranda</span>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="hidden md:flex flex-col justify-center items-center p-8 text-white text-center bg-gradient-to-br from-green-600 to-green-800">
            <img src={logo} alt="Logo" className="w-24 h-24 mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold leading-tight">BUAT AKUN ADMIN</h1>
            <p className="opacity-90 mt-2">Dinas Pertanian Kabupaten Kepulauan Yapen</p>
          </div>
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Mulai dari Sini</h2>
            <p className="text-gray-500 mb-8">Buat akun baru untuk mengelola website.</p>
            <form onSubmit={handleRegister} className="space-y-5">

              {/* v-- 4. Tambahkan input field untuk Nama Lengkap --v */}
              <div className="relative">
                <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              {/* ^-- Input field selesai ditambahkan --^ */}
              
              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password (minimal 6 karakter)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-green-400"
              >
                {loading ? (
                  "Memproses..."
                ) : (
                  <>
                    <FiUser /> Buat Akun
                  </>
                )}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-8">
              Sudah punya akun?{" "}
              <Link to="/admin/login" className="text-green-600 font-semibold hover:underline">
                Login di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;