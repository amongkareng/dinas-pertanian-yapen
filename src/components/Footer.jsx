import { FaPhoneAlt, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-brand-light text-text pt-12 pb-6 mt-16">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left */}
        <div>
          <h3 className="text-lg font-bold mb-2">PEMKAB YAPEN</h3>
          <p className="text-sm">Website resmi Dinas Pertanian</p>
        </div>

        {/* Middle */}
        <div>
          <h3 className="text-lg font-bold mb-2">INFORMASI</h3>
          <p className="text-sm">Berita</p>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-lg font-bold mb-2">KONTAK KAMI</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-brand" />
              980XXXXX
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-brand mt-1" />
              <span>
                <strong>Dinas Pertanian Yapen</strong> <br />
                Jln Irian - Serui, Papua
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FaGlobe className="text-brand" />
              <a
                href="https://kepyapenkab.go.id/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                https://kepyapenkab.go.id/
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-600">
        © 2025 Dinas Pertanian Pemerintah Kabupaten Yapen
      </div>
    </footer>
  );
};

export default Footer;
