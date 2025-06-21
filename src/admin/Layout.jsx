import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

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
      <aside className="w-64 bg-[#14532d] text-white px-6 py-8 space-y-8 shadow-md">
        <div>
          <h2 className="text-lg font-bold leading-tight tracking-wide">
            WEBSITE DINAS PERTANIAN <br /> YAPEN – ADMIN
          </h2>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-medium">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition-colors ${
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
              `px-4 py-2 rounded transition-colors ${
                isActive
                  ? "bg-white text-[#14532d] font-semibold"
                  : "hover:bg-[#166534]"
              }`
            }
          >
            Data Berita
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold text-white transition"
        >
          Keluar
        </button>
      </aside>

      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
