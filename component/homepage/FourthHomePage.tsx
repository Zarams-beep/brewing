"use client";
import React from "react";
import { CiCoffeeBean } from "react-icons/ci";
import { PiCoffeeLight } from "react-icons/pi";
import { FaAward } from "react-icons/fa6";
import { LuHandCoins } from "react-icons/lu";
import { motion } from "framer-motion";

type FeatureItem = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    id: 1,
    icon: <CiCoffeeBean className="icon-fourth" />,
    title: "Premium Beans",
    description: "Only the finest roasted beans from top farms.",
  },
  {
    id: 2,
    icon: <PiCoffeeLight className="icon-fourth" />,
    title: "Brewed Fresh",
    description: "Every cup is brewed just for you on order.",
  },
  {
    id: 3,
    icon: <FaAward className="icon-fourth" />,
    title: "Award-Winning",
    description: "Recognized nationally for excellence in coffee.",
  },
  {
    id: 4,
    icon: <LuHandCoins className="icon-fourth" />,
    title: "Affordable Luxury",
    description: "High quality without breaking the bank.",
  },
];

const FourthHomePage = () => {
  return (
    <div className="fourth-home-container third-home-container container">
      <header className="">
        <h2 className="">
          Why are we different?
        </h2>
        <p className="">
          We don’t just make your coffee, we make your day!
        </p>
      </header>

      <div className="fourth-grid">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="fourth-grid-sub"
          >
            <div className="">
              {feature.icon}
            </div>
            <h3 className="">
              {feature.title}
            </h3>
            <p className="text-sm text-secondary dark:text-dark-secondary">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FourthHomePage;
