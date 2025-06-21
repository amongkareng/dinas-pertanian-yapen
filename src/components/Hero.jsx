import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import heroBg from "../assets/bg_hero.jpg";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay gradasi transparan */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-green-900/20 to-transparent z-0" />

      {/* Konten tengah */}
      <div className="relative z-10 text-center px-4 sm:px-8">
        <p className="text-sm sm:text-base mb-4" data-aos="fade-up">
          Selamat Datang di Website Resmi
        </p>
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Dinas Pertanian Kabupaten <br className="hidden sm:block" />
          <span className="text-yellow-400">Kepulauan Yapen</span>
        </h1>

        <Link
          to="/news"
          className="inline-flex items-center gap-3 bg-yellow-400 text-green-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Lihat Berita Terbaru <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
