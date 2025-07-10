import React from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom"; // 1. Tambahkan Link
import { getAuth, signOut } from "firebase/auth";
import { FaGlobe } from "react-icons/fa"; // 2. Tambahkan ikon jika perlu

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/admin/login");
    });
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-[#14532d] text-white px-6 py-8 space-y-8 shadow-md flex flex-col">
        <div>
          <h2 className="text-lg font-bold leading-tight tracking-wide">
            WEBSITE DINAS PERTANIAN <br /> YAPEN – ADMIN
          </h2>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-medium flex-grow">
          {/* 👇 3. TAMBAHKAN LINK BARU DI SINI 👇 */}
          <Link
            to="/"
            target="_blank" // Buka di tab baru agar tidak keluar dari admin
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 rounded transition-colors hover:bg-white"
          >
            <FaGlobe />
            <span>Lihat Website</span>
          </Link>

          {/* Garis pemisah */}
          <hr className="border-green-700 my-2" />
          
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                isActive
                  ? "bg-white text-[#14532d] font-semibold"
                  : "hover:bg-[#166534]"
              }`
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/admin/berita"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                isActive
                  ? "bg-white text-[#14532d] font-semibold"
                  : "hover:bg-[#166534]"
              }`
            }
          >
            Data Berita
          </NavLink>
        </nav>

        {/* Tombol logout dipindahkan ke bawah */}
        <div>
            <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold text-white transition"
            >
            Keluar
            </button>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;