import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ProgramdanKegiatan = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="container py-16">
      {/* Judul utama */}
      <h1
        className="text-2xl sm:text-4xl font-bold text-brand text-center mb-12"
        data-aos="fade-up"
      >
        Program dan Kegiatan Dinas Pertanian
      </h1>

      {/* 1. Gerakan Menanam Komoditas Pangan */}
      <div className="mb-10 space-y-3" data-aos="fade-up">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-brand hover:underline">
          1. Gerakan Menanam Komoditas Pangan
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Tujuan:</strong> Mengajak masyarakat, ASN, dan pejabat
            daerah untuk bersama-sama menanam tanaman pangan seperti cabai,
            tomat, dan jagung.
          </li>
          <li>
            <strong>Manfaat:</strong> Meningkatkan ketersediaan pangan lokal,
            mengendalikan harga bahan makanan, dan membantu mengurangi stunting
            serta kemiskinan.
          </li>
          <li>
            <strong>Contoh:</strong> Penanaman serentak di lahan 5 hektar oleh
            Pemda dan masyarakat.
          </li>
        </ul>
      </div>

      {/* 2. Penanaman Jagung di Lahan Tidur */}
      <div className="mb-10 space-y-3" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-brand hover:underline">
          2. Penanaman Jagung di Lahan Tidur
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Tujuan:</strong> Menghidupkan lahan kosong agar bisa
            digunakan untuk menanam jagung, sebagai bagian dari program
            ketahanan pangan.
          </li>
          <li>
            <strong>Kegiatan:</strong> Penanaman di Kampung Kamanap, Distrik
            Koswo.
          </li>
          <li>
            <strong>Manfaat:</strong> Membantu memenuhi kebutuhan pangan dan
            mendukung program pemerintah pusat seperti “Makan Bergizi Gratis”.
          </li>
        </ul>
      </div>

      {/* 3. Bantuan Langsung ke Petani */}
      <div className="space-y-3" data-aos="fade-up" data-aos-delay="200">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-brand hover:underline">
          3. Bantuan Langsung ke Petani
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Bantuan:</strong> Bibit sayur, pupuk, pestisida, dan
            peralatan tani.
          </li>
          <li>
            <strong>Sasaran:</strong> Kelompok tani di berbagai distrik, seperti
            Ambai dan Koswo.
          </li>
          <li>
            <strong>Tujuan:</strong> Meningkatkan produktivitas pertanian skala
            rumah tangga, menekan biaya tanam, dan membantu petani dalam masa
            sulit (inflasi atau cuaca ekstrem).
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProgramdanKegiatan;
