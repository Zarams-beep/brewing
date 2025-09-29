"use client";
import React, { useEffect, useState } from "react";
import HeaderBar from "@/component/navBar/navBar";
import MediaHeaderSection from "@/component/navBar/MediaNavBar";
import { motion } from "framer-motion";
import "../../styles/Blogpage.css";

const BlogHero = () => {
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
    <div className="blog-section">
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
          <h6 className="hero-subtitle">Brewed Thoughts & Coffee Conversations</h6>
          <h1 className="hero-title">Welcome to Our Blog</h1>
          <h4 className="hero-description">
            Sip into stories, tips, and inspirations from the heart of coffee culture.
            Discover brewing secrets, customer spotlights, and everything that makes your morning better.
          </h4>
          {/* <button className="hero-button">Explore Posts</button> */}
        </motion.div></div>
      </div>
    </div>
  );
};

export default BlogHero;
