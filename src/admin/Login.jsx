import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLogIn, FiArrowLeft } from "react-icons/fi";
import logo from "../assets/logo_dinas.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login berhasil! Mengalihkan ke dasbor...");
      navigate("/admin/dashboard");
    } catch (err) {
      let errorMessage = "Login gagal. Cek kembali email dan password Anda.";
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        errorMessage = "Email atau password yang Anda masukkan salah.";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Terlalu banyak percobaan gagal. Coba lagi nanti.";
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-800 hover:text-white transition-colors z-10 flex items-center gap-2 bg-green-400 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          <FiArrowLeft />
          <span clas>Beranda</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="hidden md:flex flex-col justify-center items-center p-8 text-white text-center bg-gradient-to-br from-green-600 to-green-800">
            <img src={logo} alt="Logo" className="w-24 h-24 mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold leading-tight">
              ADMIN PANEL
            </h1>
            <p className="opacity-90 mt-2">
              Dinas Pertanian Kabupaten Kepulauan Yapen
            </p>
          </div>

          <div className="pt-20 px-8 pb-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Selamat Datang Kembali!
            </h2>
            <p className="text-gray-500 mb-8">
              Silakan masuk untuk melanjutkan.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    {" "}
                    <FiLogIn /> Login{" "}
                  </>
                )}
              </button>
            </form>

            {/* <p className="text-center text-sm text-gray-600 mt-8">
              Belum punya akun?{" "}
              <Link
                to="/admin/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Daftar Sekarang!
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
