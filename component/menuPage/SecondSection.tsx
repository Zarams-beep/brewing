"use client";

import React, { useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// ==================== TYPES ====================
type Category =
  | "All"
  | "Hot Coffee"
  | "Iced Coffee"
  | "Signature"
  | "Seasonal"
  | "Non-Caffeine";

interface CoffeeItem {
  id: number;
  name: string;
  image: string;
  altImage?: string;
  description: string;
  tags: string[];
  category: Category;
  ingredients: string[];
  price: number;
  rating: number;
  special: string;
}

// ==================== DATA ====================
const categories: Category[] = [
  "All",
  "Hot Coffee",
  "Iced Coffee",
  "Signature",
  "Seasonal",
  "Non-Caffeine",
];

// const coffeeMenu: CoffeeItem[] = [
//   {
//     id: 1,
//     name: "Bold Caramel Latte",
//     image: "/img-7.jpg",
//     altImage: "/img-8.jpg",
//     description: "Sweet, smoky, and smooth",
//     tags: ["Hot", "Vegan", "Popular"],
//     category: "Hot Coffee",
//     ingredients: ["Espresso", "Caramel", "Steamed Oat Milk"],
//     price: 1500,
//     rating: 4.8,
//     special: "Best-seller for cozy mornings",
//   },
//   {
//     id: 2,
//     name: "Iced Vanilla Brew",
//     image: "/img-3.jpg",
//     altImage: "/img-2.jpg",
//     description: "Cool, creamy and bold",
//     tags: ["Iced", "Seasonal"],
//     category: "Iced Coffee",
//     ingredients: ["Cold Brew", "Vanilla Syrup", "Milk", "Ice"],
//     price: 1600,
//     rating: 4.5,
//     special: "Perfect for hot afternoons",
//   },
//   {
//     id: 3,
//     name: "Hazelnut Mocha Bliss",
//     image: "/img-16.jpg",
//     altImage: "/img-18.jpg",
//     description: "Nutty delight with a chocolate twist",
//     tags: ["Hot", "Popular"],
//     category: "Signature",
//     ingredients: ["Espresso", "Hazelnut", "Chocolate", "Milk"],
//     price: 1800,
//     rating: 4.9,
//     special: "Signature chocolate + hazelnut combo",
//   },
//   {
//     id: 4,
//     name: "Pumpkin Spice Latte",
//     image: "/img-17.jpg",
//     altImage: "/img-4.jpg",
//     description: "Spicy seasonal magic",
//     tags: ["Hot", "Seasonal", "Vegan"],
//     category: "Seasonal",
//     ingredients: ["Espresso", "Pumpkin Spice", "Oat Milk"],
//     price: 1700,
//     rating: 4.6,
//     special: "Autumn in a cup",
//   },
//   {
//     id: 5,
//     name: "Coconut Matcha Chill",
//     image: "/img-6.jpg",
//     altImage: "/img-10.jpg",
//     description: "Earthy matcha meets tropical coconut",
//     tags: ["Non-Caffeine", "Iced"],
//     category: "Non-Caffeine",
//     ingredients: ["Matcha", "Coconut Milk", "Ice"],
//     price: 1900,
//     rating: 4.4,
//     special: "No caffeine, all vibes",
//   },
// ];
type Props = {
  selectedCoffee: CoffeeItem;
};

// ==================== COMPONENT ====================
const CoffeeMenu = () => {
  const { status } = useSession();
  const router = useRouter();
    const [data, setData] = useState<CoffeeItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);

   useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`, {
            cache: "no-store",
          });
          if (!res.ok) throw new Error("Failed to fetch data");
          const json = await res.json();
          setData(json);
        } catch (err) {
          console.error("❌ Error fetching blog data:", err);
        }
      };
  
      if (status === "authenticated") {
        getData();
      }
    }, [status]);
  
    if (status === "loading") {
      return <p>Loading...</p>;
    }
  const filteredMenu =
    selectedCategory === "All"
      ? data
      : data.filter((item) => item.category === selectedCategory);

      const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    router.push("/checkout");
  };
  return (
    <div className="main-menu-wrapper">
            <header className="">
  <h2 className="">
    Discover Your Perfect Coffee Blend
  </h2>
  <p className="">
    Explore a rich variety of flavors, from classic brews to bold new tastes — there's always a cup worth discovering.
  </p>
</header>

    <div className="menu-wrapper">

    <div className="menu-wrapper-sub">
          {/* Tabs */}
      <div className="tab-section">
        {categories.map((cat) => (
          <motion.button
            layout
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${
              selectedCategory === cat
                ? "active-btn"
                : "non-active-btn"
            }`}
          >
            {cat}
            {selectedCategory === cat && (
              <motion.div
                layoutId="underline"
                className="btn-overlay"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        <AnimatePresence>
          {filteredMenu.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCoffee(item)}
              className="menu-selected"
            >
              <div className="img-container">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className=""
                />
              </div>
             <div className="menu-selected-sub">
                 <h4 className="">{item.name}</h4>
              <p className="">
                {item.description}
              </p>
              <div className="menu-sub">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className=""
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="menu-price">
                ₦{item.price}
              </div>
              <button className="btn-details">
                View Details
              </button>
             </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>

      {/* Details Panel */}
      {selectedCoffee && (
        <motion.div
          layout
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="menu-selected details-panel"
        >
          <div className="img-container">
            <Image
              src={selectedCoffee.altImage || selectedCoffee.image}
              alt={selectedCoffee.name}
              fill
              className=""
            />
          </div>
          <div className="menu-selected-sub">
            <h4 className="">{selectedCoffee.name}</h4>
          <p className="">
            {selectedCoffee.description}
          </p>
          <p className="special">
            Why it's special: {selectedCoffee.special}
          </p>
          <div className="ingredient-container">
            <strong>Ingredients:</strong>
            <ul className="">
              {selectedCoffee.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
          <p className="">Price: ₦Total: ₦{(selectedCoffee.price * quantity).toLocaleString()}</p>
          <p className="">Rating: ⭐ {selectedCoffee.rating}</p>
          <div className="quantity-control">
          <span className="">Qty:</span>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className=""
          >
            -
          </button>
          <span className="">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className=""
          >
            +
          </button>
        </div>
          <button className="add-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          </div>
        </motion.div>
      )}
    </div></div>
  );
};

export default CoffeeMenu;
