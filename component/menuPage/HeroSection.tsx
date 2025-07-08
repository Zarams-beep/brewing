"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeaderBar from "@/component/navBar/navBar";
import MediaHeaderSection from "@/component/navBar/MediaNavBar";

const HeroMenu = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="menu-section">
      <div className="overlay">
        {!isMobile ? <HeaderBar /> : <MediaHeaderSection />}

        {/* Overlay content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="hero-content"
        >
          <h6 className="">
            From bold espressos to silky lattes, every cup is a love letter to
          </h6>
          <h1>Coffee</h1>
          <h4 className="">
            Discover a menu brewed for every mood, from the rich boldness of espresso to the smooth comfort of chai. Crafted with love, sipped with joy.
          </h4>
          <button className="">Order Now</button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroMenu;
