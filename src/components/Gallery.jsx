import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import aos from "aos";
import "aos/dist/aos.css";

const Gallery = () => {
  const [beritaTerbaru, setBeritaTerbaru] = useState([]);

  useEffect(() => {
    aos.init({
      duration: 1000,
      delay: 200,
      once: false,
    });

    const fetchBeritaTerbaru = async () => {
      try {
        const q = query(
          collection(db, "berita"),
          orderBy("date", "desc"),
          limit(6)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBeritaTerbaru(data);
      } catch (error) {
        console.error("Gagal mengambil berita untuk galeri:", error);
      }
    };

    fetchBeritaTerbaru();
  }, []);

  return (
    <section className="py-16" id="gallery">
      <div className="container">
        <h2
          data-aos="fade-up"
          className="text-center text-2xl md:text-3xl font-bold mb-12"
        >
          Kegiatan Dinas Pertanian Yapen
        </h2>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {beritaTerbaru.map((item, index) => (
            <NewsCard key={item.id} {...item} dataAosDelay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
