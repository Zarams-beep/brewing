"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRef } from "react";

type Drink = {
  name: string;
  image: string;
  description: string;
  story: string;
};

const signatureDrinks: Drink[] = [
  {
    name: "Smoked Vanilla Affogato",
    image: "/img-7.jpg",
    description: "A bold vanilla espresso poured over smoky cold cream.",
    story: "Inspired by old Italian summer cafes where smoky flavors met sweet indulgence.",
  },
  {
    name: "Honey Cinnamon Brew",
    image: "/img-8.jpg",
    description: "Smooth coffee sweetened with natural honey and spiced with a touch of cinnamon.",
    story: "Born from early morning hikes and a beekeeper’s tale in Jos, Nigeria.",
  },
  {
    name: "Coconut Macchiato Frost",
    image: "/img-2.jpg",
    description: "A tropical twist with coconut milk and velvety espresso over ice.",
    story: "Created during our beach pop-up café in Lekki’s heatwave of 2021.",
  },
];

const BaristasPick = () => {
  const [drink, setDrink] = useState<Drink | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40% 0px" });

  useEffect(() => {
    // Random drink per reload
    const random = signatureDrinks[Math.floor(Math.random() * signatureDrinks.length)];
    setDrink(random);
  }, []);

  if (!drink) return null;

  return (
    <div className="main-baristas-section">
      <div className="container">
    <header className="">
  <h2 className="">
    Handpicked by Our Baristas
  </h2>
  <p className="">
    Discover the brews our baristas love most — crafted with care, flavor, and a touch of passion.
  </p>
</header>

    <section className="baristas-pick-section">
  {drink && (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="baristas-pick-card"
    >
      <div className="baristas-img">
        <Image
          src={drink.image}
          alt={drink.name}
          width={100}
          height={100}
          quality={100}
        />
      </div>
      <div className="baristas-content">
        <div className="header-barista">
          <FaStar className="icon" /> <span>Barista’s Pick</span>
        </div>
        <h3>{drink.name}</h3>
        <p>{drink.description}</p>
        <p>{drink.story}</p>
      </div>
    </motion.div>
  )}
</section></div>
</div>
  );
};

export default BaristasPick;
