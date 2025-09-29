"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LiaHandsHelpingSolid } from "react-icons/lia";

const helps = [
  {
    images: ["https://images.unsplash.com/photo-1515860734122-e0d771b36d3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyaXN0YXxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1721058579699-e4f911270c9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhbnMlMjBwcm98ZW58MHx8MHx8fDA%3D"],
    note: "Harvest to Roast",
    description:
      "Our beans begin their journey in rich African soil. We work with local farmers who handpick every cherry at its peak. From sun-drying to careful roasting, each step is fueled by care.",
  },
  {
    images: ["https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1703646616814-0da71e362330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxyb2FzdGVyfGVufDB8fDB8fHww"],
    note: "Artful Roasting",
    description:
      "Each roast is calibrated for depth and aroma. With time-tested techniques, we balance tradition with technology to bring out each bean’s boldest personality.",
  },
  {
    images: ["https://images.unsplash.com/photo-1561986863-60b73438b5c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFzdGluZ3xlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1511225317751-5c2d61819d58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fHJvYXN0ZXJ8ZW58MHx8MHx8fDA%3D"],
    note: "Tasting and Testing",
    description:
      "Our cupping process ensures that only the finest brews reach your cup. Quality control is rigorous, because perfection isn’t optional—it’s our promise.",
  },
  {
    images: ["https://images.unsplash.com/photo-1637773335534-5b44d828c267?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU1fHxzZXJ2ZXxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1507914464562-6ff4ac29692f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFyaXN0YXxlbnwwfHwwfHx8MA%3D%3D"],
    note: "Crafted for You",
    description:
      "From the espresso shot to the latte art, your cup is our final canvas. Every sip reflects our people, our passion, and the stories behind the beans.",
  },
];

export default function BehindTheBeans() {
  return (
    <section className="fifth-container">
      <div className="container">
      <div className="beans-header">
        <h2>Behind the Beans</h2>
        <p className="">
          From the farm to your cup — our coffee is a story of care, craft, and conscious choices.
        </p>
</div>
      <div className="alternating-container">
        {helps.map((item, index) => (
          <AlternatingHelpBlock
            key={index}
            {...item}
            reverse={index % 2 !== 0}
          />
        ))}
      </div></div>
    </section>
  );
}

function AlternatingHelpBlock({
  images,
  note,
  description,
  reverse,
}: {
  images: string[];
  note: string;
  description: string;
  reverse: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const isMultiple = images.length > 1;

  return (
    <motion.div
      className={`how-help-container ${reverse ? "reverse-help" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="how-help-card">
        <Image
          src={images[current]}
          alt={note}
          fill
          className="help-image"
          priority
        />
        {isMultiple && (
          <div className="arrow-help">
            <button
              onClick={() =>
                setCurrent((prev) => (prev - 1 + images.length) % images.length)
              }
              className="arrow-button"
              aria-label="Previous Image"
            >
              <IoIosArrowBack />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
              className="arrow-button"
              aria-label="Next Image"
            >
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </div>

      <div className="how-help-content">
        <h3 className="help-note">{note}</h3>
        <p className="help-description">{description}</p>
      </div>
    </motion.div>
  );
}
