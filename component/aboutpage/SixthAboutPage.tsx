"use client";
import React from "react";
import { FaRecycle, FaHandsHelping, FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

// Animate items one after the other
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" as const, }
  },
};


const efforts = [
  {
    icon: <FaRecycle />,
    title: "Reusable Everything",
    description: "Customers get discounts for bringing their own cups. Our packaging is 100% compostable.",
  },
  {
    icon: <FaSeedling />,
    title: "Ethical Beans",
    description: "We only source from farms that prioritize fair wages and regenerative farming techniques.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Uplifting Locals",
    description: "We support local employment, sponsor barista training programs, and donate 5% of profits to community gardens.",
  },
];

const SustainabilityCommunity = () => {
  return (
    <section className="sustainability-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="sustainability-header"
      >
        <h2>Sustainability & Community Impact</h2>
        <p>Brewing with purpose — because coffee should be good for people and planet.</p>
      </motion.div>

      <div className="sustainability-sub">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="sustainability-sub-1"
        >
          {efforts.map((effort, index) => (
            <motion.div key={index} variants={itemVariants} className="sustainability-min-1">
              <div className="icon text-3xl text-primary dark:text-dark-primary">{effort.icon}</div>
              <div>
                <h4 className="font-semibold text-lg">{effort.title}</h4>
                <p className="text-mutedGray dark:text-dark-mutedGray">{effort.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="img-sustainability"
        >
          <Image
            src="/sustainable-green-svgrepo-com.svg"
            alt="sustainability"
            width={100}
            height={100}
            quality={100}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilityCommunity;
