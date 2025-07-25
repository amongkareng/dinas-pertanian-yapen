import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// 👇 1. Impor hook, fungsi, dan ikon baru 👇
import { FaChevronDown, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import logo from "../assets/logo_dinas.svg";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // 👇 2. Panggil hook useAuth dan useNavigate 👇
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // 👇 3. Buat fungsi untuk logout 👇
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Arahkan ke halaman utama setelah logout
      })
      .catch((error) => {
        console.error("Gagal logout:", error);
      });
  };

  const navItems = [
    { name: "Beranda", to: "/" },
    {
      name: "Profil",
      dropdown: [
        { name: "Visi & Misi", to: "/visimisi" },
        { name: "Struktur Dinas", to: "/struktur" },
      ],
    },
    { name: "Program", dropdown: [{ name: "Program dan Kegiatan", to: "/program" }] },
    { name: "Informasi", dropdown: [{ name: "Berita", to: "/news" }] },
  ];

  const baseLinkStyle = "pb-1 transition-colors duration-300";
  const activeLinkStyle = "text-white font-bold border-b-2 border-yellow-400";
  const inactiveLinkStyle = "text-gray-200 hover:text-white";

  return (
    <header className="bg-[color:var(--color-brand)] text-white shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo Dinas" className="w-14 h-14" />
          <div className="font-bold leading-5 text-sm sm:text-base">
            <span className="block text-white">Dinas Pertanian</span>
            <span className="block text-white">Kabupaten Kepulauan Yapen</span>
          </div>
        </NavLink>

        {/* Grup Navigasi Kanan (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {/* Menu Navigasi Utama */}
          <nav className="flex gap-6 text-sm font-medium relative">
            {/* ... (Menu navigasi tidak berubah) ... */}
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <>
                    {(() => {
                      const isDropdownActive = item.dropdown.some(
                        (sub) => location.pathname === sub.to
                      );
                      return (
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`flex items-center gap-1 ${baseLinkStyle} ${
                            isDropdownActive ? activeLinkStyle : inactiveLinkStyle
                          }`}
                        >
                          {item.name} <FaChevronDown size={12} />
                        </button>
                      );
                    })()}
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white text-black shadow-lg rounded text-sm p-2 w-48 z-50">
                        {item.dropdown.map((sub) => (
                          <NavLink to={sub.to} key={sub.name} className={({ isActive }) => `block whitespace-nowrap text-left w-full py-1 px-2 rounded ${ isActive ? "bg-green-100 text-green-800 font-bold" : "hover:bg-gray-100" }` }>
                            {sub.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink to={item.to} className={({ isActive }) => `${baseLinkStyle} ${ isActive ? activeLinkStyle : inactiveLinkStyle }`} end>
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* 👇 4. Tampilan Login Dinamis untuk Desktop 👇 */}
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <FaUserCircle size={24} />
                <span className="font-medium text-sm">{currentUser.displayName}</span>
                <button onClick={handleLogout} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-red-700 transition-colors ml-2">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/admin/login" className="bg-yellow-400 text-green-900 font-bold py-2 px-4 rounded-lg text-sm hover:bg-yellow-500 transition-colors">
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Hamburger Icon untuk Mobile */}
        <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[color:var(--color-brand)] text-white absolute top-full left-0 w-full shadow-inner py-4 px-6 space-y-4">
          {/* ... (Menu mobile tidak berubah) ... */}
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-green-700 pb-3">
              {item.dropdown ? (
                 <div>
                 {(() => {
                   const isDropdownActive = item.dropdown.some(
                     (sub) => location.pathname === sub.to
                   );
                   return (
                     <button
                       onClick={() => toggleDropdown(item.name)}
                       className={`flex justify-between w-full items-center font-medium ${
                         isDropdownActive ? "text-yellow-400" : ""
                       }`}
                     >
                       {item.name} <FaChevronDown size={12} />
                     </button>
                   );
                 })()}
                 {activeDropdown === item.name && (
                   <div className="mt-2 ml-4 space-y-2">
                     {item.dropdown.map((sub) => (
                       <NavLink to={sub.to} key={sub.name} className={({ isActive }) => `block text-sm ${ isActive ? "text-yellow-400 font-bold" : "text-gray-200 hover:text-white" }`}>
                         {sub.name}
                       </NavLink>
                     ))}
                   </div>
                 )}
               </div>
              ) : (
                <NavLink to={item.to} className={({ isActive }) => `block font-medium ${ isActive ? "text-yellow-400 font-bold" : "text-white"}`} end>
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}

          {/* 👇 5. Tampilan Login Dinamis untuk Mobile 👇 */}
          <div className="pt-4">
            {currentUser ? (
               <div className="flex flex-col items-center gap-3">
                 <div className="flex items-center gap-2">
                    <FaUserCircle size={22} />
                    <span className="font-bold">{currentUser.displayName}</span>
                 </div>
                 <button onClick={handleLogout} className="block font-bold text-white text-center bg-red-600 w-full py-2 rounded-lg mt-2">
                   Logout
                 </button>
               </div>
            ) : (
              <NavLink to="/admin/login" className="block font-bold text-green-800 text-center bg-yellow-400 w-full py-2 rounded-lg">
                Login Admin
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;