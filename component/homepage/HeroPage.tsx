"use client";
import React, { useEffect, useState } from "react";
import HeaderBar from "@/component/navBar/navBar";
import MediaHeaderSection from "@/component/navBar/MediaNavBar";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize(); // Run once
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="hero-section">
      <div className="overlay">
        {!isMobile ? <HeaderBar /> : <MediaHeaderSection />}
        <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="hero-content"
        >
          <h6 className="">We’ve got your morning covered with</h6>
          <h1 className="">Coffee</h1>
          <h4 className="">
            It is best to start your day with a cup of coffee. Discover the best
            flavours coffee you will ever have. We provide the best for our
            customers.
          </h4>
          <button className="">Order Now</button>
        </motion.div></div>
      </div>
    </div>
  );
};

export default HeroSection;
