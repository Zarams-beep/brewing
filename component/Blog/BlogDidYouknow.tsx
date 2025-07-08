"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLightbulb } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DidYouKnow = () => {
  const { status } = useSession();
  const router = useRouter();

  const [data, setData] = useState<{ fact: string; img: string; Type: string }[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/facts`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch facts");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("❌ Error fetching facts:", err);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  const currentFact = data[index];

  return (
    <div className="did-you-know">
      <h2 className="header-know">
        <FaLightbulb className="bulb" /> Did You Know?
      </h2>

      <div className="did-you-know-sub">
        <AnimatePresence mode="wait">
          {currentFact && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="did-you-know-animation"
            >
              <Image
                src={currentFact.img}
                alt={currentFact.fact}
                width={500}
                height={300}
                quality={100}
                className=""
              />
              <div className="did-you-know-small">
                <h2 className="fact-know">{currentFact.fact}</h2>
              <h6 className="">#{currentFact.Type}</h6>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DidYouKnow;
