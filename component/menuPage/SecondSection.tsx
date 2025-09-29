"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addToCart } from "@/store/slices/CartSlices";

type Category =
  | "All"
  | "Hot Coffee"
  | "Iced Coffee"
  | "Signature"
  | "Seasonal"
  | "Non-Caffeine";

interface CoffeeItem {
  _id: string; 
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

const categories: Category[] = [
  "All",
  "Hot Coffee",
  "Iced Coffee",
  "Signature",
  "Seasonal",
  "Non-Caffeine",
];

const CoffeeMenu = () => {
  const { status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<CoffeeItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const getData = async () => {
      const baseURL =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_BASE_URL_PROD
        : process.env.NEXT_PUBLIC_BASE_URL_DEV;
      try {
        const res = await fetch(`${baseURL}/api/orders`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("❌ Error fetching menu data:", err);
      }
    };

    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  const filteredMenu =
    selectedCategory === "All"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  const handleAddToCart = () => {
    if (!selectedCoffee) return;

    dispatch(
      addToCart({
        ...selectedCoffee,
        quantity,
      })
    );

    router.push("/checkout");
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="main-menu-wrapper">
      <div className="container">
      <header>
        <h2>Discover Your Perfect Coffee Blend</h2>
        <p>
          Explore a rich variety of flavors, from classic brews to bold new
          tastes — there's always a cup worth discovering.
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
                  selectedCategory === cat ? "active-btn" : "non-active-btn"
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div layoutId="underline" className="btn-overlay" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="menu-grid">
            <AnimatePresence>
              {filteredMenu.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedCoffee(item);
                    setQuantity(1);
                  }}
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
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <div className="menu-sub">
                      {item.tags
                        .filter((tag) => tag?.trim())
                        .map((tag, i) => (
                          <span key={`${item._id}-${tag}-${i}`}>{tag}</span>
                        ))}
                    </div>
                    <div className="menu-price">₦{item.price}</div>
                    <button className="btn-details">View Details</button>
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
            <div className="img-container-details">
              <Image
                src={selectedCoffee.altImage || selectedCoffee.image}
                alt={selectedCoffee.name}
                fill
                className=""
              />
            </div>
            <div className="menu-selected-sub">
              <h4>{selectedCoffee.name}</h4>
              <p>{selectedCoffee.description}</p>
              <p className="special">Why it's special: {selectedCoffee.special}</p>
              <div className="ingredient-container">
                <strong>Ingredients:</strong>
                <ul>
                  {selectedCoffee.ingredients.map((ing, i) => (
                    <li key={`${selectedCoffee._id}-${ing}-${i}`}>{ing}</li>
                  ))}
                </ul>
              </div>
              <p>Price: ₦{selectedCoffee.price.toLocaleString()}</p>
              <p>Total: ₦{(selectedCoffee.price * quantity).toLocaleString()}</p>
              <p>Rating: ⭐ {selectedCoffee.rating}</p>

              {/* Quantity Control */}
              <div className="quantity-control">
                <span>Qty:</span>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>

              <button className="add-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </div></div>
    </div>
  );
};

export default CoffeeMenu;
