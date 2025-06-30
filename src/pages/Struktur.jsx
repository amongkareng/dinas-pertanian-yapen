import React, { useEffect } from "react";
import struktur from "../assets/struktur.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Struktur = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <main className="container py-16">
        <section className="text-center mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            data-aos="fade-up"
          >
            Struktur Organisasi Dinas Pertanian
          </h1>
          <p
            className="text-gray-700 mb-1"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Lampiran Peraturan Bupati Kepulauan Yapen
          </p>
          <p className="text-gray-700" data-aos="fade-up" data-aos-delay="200">
            Nomor : 17 Tahun 2021
          </p>
          <p className="text-gray-700" data-aos="fade-up" data-aos-delay="300">
            Tanggal : 21 Mei 2021
          </p>
        </section>

        <div
          className="flex justify-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <img
            src={struktur}
            alt="Struktur Organisasi"
            className="w-full max-w-4xl rounded shadow-md"
          />
        </div>
      </main>
    </>
  );
};

export default Struktur;
