import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const NewsCard = (props) => {
  const { slug, image, title, date, location, dataAosDelay } = props;

  const formattedDate =
    date && typeof date.toDate === "function"
      ? date.toDate().toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : date || "Tanggal tidak valid";

  return (
    <Link
      to={`/news/${slug}`}
      className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover bg-gray-200"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-3 flex-grow">
          {title}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-600" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-auto">
          <span className="inline-block bg-orange-500 text-white font-semibold py-2 px-5 rounded-md text-sm hover:bg-orange-600 transition-colors">
            Selengkapnya
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
