import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const VisidanMisi = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      delay: 200,
      once: false,
    });
  }, []);
  return (
    <>
      <section className="container py-16">
        {/* Title */}
        <h1
          className="text-2xl sm:text-4xl font-bold text-brand text-center mb-10"
          data-aos="fade-up"
        >
          VISI & MISI DINAS PERTANIAN
        </h1>

        {/* Visi */}
        <div className="mb-10" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Visi</h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            “Terwujudnya usaha pertanian yang efisien, produktif dan kompetitif”
          </p>
        </div>

        {/* Misi */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Misi</h2>
          <ol className="list-decimal pl-5 space-y-3 text-gray-700 leading-relaxed">
            <li>
              Mewujudkan sumber daya manusia yang terampil dan berkualitas.
            </li>
            <li>Meningkatkan partisipasi petani dalam usaha agribisnis.</li>
            <li>
              Membangun pertanian yang efisien, produktif dan berkelanjutan.
            </li>
            <li>
              Meningkatkan pengendalian hama terpadu pada komoditas pertanian.
            </li>
            <li>
              Meningkatkan upaya ekstensifikasi, intensifikasi, rehabilitasi dan
              diversifikasi.
            </li>
            <li>Meningkatkan sumber daya petani untuk meningkatkan ekonomi.</li>
          </ol>
        </div>
      </section>
    </>
  );
};

export default VisidanMisi;
