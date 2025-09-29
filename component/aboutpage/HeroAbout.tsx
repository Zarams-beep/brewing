"use client"
import React, { useEffect, useState } from "react";
import HeaderBar from "@/component/navBar/navBar";
import MediaHeaderSection from '@/component/navBar/MediaNavBar';
import { motion } from "framer-motion";
const HeroAbout = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);  

  return (
    <div className="about-section">
      <div className="overlay">
        {!isMobile ? <HeaderBar /> : <MediaHeaderSection />}
        <div className="container">
        <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }} className="hero-content">
          <h6 className="">We've been brewing coffee with passion since day one.</h6>
          
          <h1 className="">Coffee</h1>
          
          <h4 className="">
            Discover the warmth, flavor, and comfort in every cup — expertly brewed since 2000.
          </h4>
          
          <button className="">
            Order Now
          </button>
        </motion.div></div>
      </div>
    </div>
  );
};

export default HeroAbout;
