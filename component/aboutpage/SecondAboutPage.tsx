"use client";
import React from "react";
import Image from "next/image";
import { GiCoffeeMug } from "react-icons/gi";
import { DiCoffeescript } from "react-icons/di";
const AboutContent = () => {
  return (
    <section className="about-content-container">
      {/* Header & description */}
      <div className="about-header">
        <h2 className="about-title">More Than Just Coffee</h2>
        <p className="about-description">
          At BeanScene, we blend more than coffee—we blend experiences. Every cup tells a story of dedication, origin, and craft.
        </p>
      </div>

      {/* Vision - Image - Mission */}
      <div className="about-vision-mission-grid">
         <div className="coffee-image-box">
          <GiCoffeeMug
            className="coffee-image-md"
          />
           <DiCoffeescript
            className="coffee-image-dark-md"
          />
        </div>
        <div className="vision-box">
          <h4 className="vision-title">Our Vision</h4>
          <p className="vision-text">
            To become a global symbol of comfort, warmth, and quality through every coffee cup we serve.
          </p>
        </div>

        <div className="coffee-image-box">
          <GiCoffeeMug
            className="coffee-image"
          />
           <DiCoffeescript
            className="coffee-image-dark"
          />
        </div>

        <div className="mission-box">
          <h4 className="mission-title">Our Mission</h4>
          <p className="mission-text">
            To deliver exceptional coffee while fostering community and sustainability, one brew at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
