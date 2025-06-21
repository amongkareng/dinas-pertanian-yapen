// src/components/PublicLayout.jsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const PublicLayout = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, delay: 100, once: true });
  }, []);

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default PublicLayout;
