import {
  FaPhoneAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Impor Link untuk navigasi

const Footer = () => {
  return (
    // Kurangi padding atas dari pt-16 menjadi pt-12
    <footer className="bg-white text-gray-700 pt-12 pb-8 mt-16">
      <div className="container">
        {/* Gunakan 4 kolom untuk menampung semua informasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Kolom 1: Tentang */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold mb-3 text-green-800">PEMKAB YAPEN</h3>
            <p className="text-sm">
              Website resmi Dinas Pertanian Kabupaten Kepulauan Yapen.
            </p>
          </div>

          {/* Kolom 2: Informasi */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-green-800">INFORMASI</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/news" className="hover:text-green-600 hover:underline">
                  Berita
                </Link>
              </li>
              <li>
                <Link to="/program" className="hover:text-green-600 hover:underline">
                  Program
                </Link>
              </li>
               <li>
                <Link to="/visimisi" className="hover:text-green-600 hover:underline">
                  Visi & Misi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Kami */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-green-800">KONTAK KAMI</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-700" />
                980XXXXX
              </li>
              <li className="flex items-center gap-2">
                <FaGlobe className="text-green-700" />
                <a
                  href="https://kepyapenkab.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-green-600"
                >
                  kepyapenkab.go.id
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Ikuti Kami (Media Sosial) */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-green-800">IKUTI KAMI</h3>
            <div className="flex items-center gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaFacebook size={22} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-gray-500 hover:text-pink-500 transition-colors">
                <FaInstagram size={22} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" title="Telegram" className="text-gray-500 hover:text-blue-400 transition-colors">
                <FaTelegram size={22} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-gray-500 hover:text-green-500 transition-colors">
                <FaWhatsapp size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-200 pt-6">
          © {new Date().getFullYear()} Dinas Pertanian Pemerintah Kabupaten Yapen
        </div>
      </div>
    </footer>
  );
};

export default Footer;