"use client";
import React from "react";
import { FaCoffee, FaStoreAlt, FaUsers, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "2000",
    icon: <FaStoreAlt />,
    title: "Humble Beginnings",
    description: "We opened our first coffee corner in the heart of Lagos, armed with nothing but a love for freshly brewed coffee and a dream.",
  },
  {
    year: "2005",
    icon: <FaUsers />,
    title: "Community First",
    description: "We became a local favorite welcoming creatives, students, and dreamers who craved a cup and a calm space.",
  },
  {
    year: "2015",
    icon: <FaCoffee />,
    title: "Craft Redefined",
    description: "Introduced artisanal brewing and began sourcing beans ethically from smallholder farms across Africa.",
  },
  {
    year: "2023",
    icon: <FaAward />,
    title: "National Recognition",
    description: "Named one of Nigeria’s top 10 boutique cafés, and we’re still brewing greatness one sip at a time.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

const OurStory = () => {
  return (
    <section className="our-story-section">
      <div className="container">
      <motion.div
        className="our-story-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="">Our Story</h2>
        <p className="">
          From a single shop in Lagos to a beloved brand that brews passion, purpose, and perfection—one cup at a time.
        </p>
      </motion.div>

      <div className="our-story-timeline">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="timeline-item flex items-start gap-4"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
          >
            <div className="timeline-icon text-3xl text-primary dark:text-dark-primary">
              {milestone.icon}
            </div>
            <div className="timeline-content">
              <h4 className="timeline-year text-xl font-semibold">{milestone.year}</h4>
              <h5 className="timeline-title text-lg text-secondary dark:text-dark-secondary font-medium">{milestone.title}</h5>
              <p className="timeline-description text-mutedGray dark:text-dark-mutedGray">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div></div>
    </section>
  );
};

export default OurStory;
