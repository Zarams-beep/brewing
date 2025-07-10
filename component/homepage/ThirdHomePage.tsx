"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

// Autoplay Plugin with safety checks
function AutoplayPlugin(slider: any) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver || !slider) return;
    timeout = setTimeout(() => {
      if (slider?.next) slider.next();
    }, 2000);
  }

  slider.on("created", () => {
    if (!slider?.container) return;

    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

const ThirdHomePage = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 4,
        spacing: 10,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2.5, spacing: 16 },
        },
        "(max-width: 768px)": {
          slides: { perView: 1.5, spacing: 12 },
        },
        "(max-width: 420px)": {
          slides: { perView: 1, spacing: 10 },
        },
      },
    },
    [AutoplayPlugin]
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("❌ Error fetching coffee data:", err);
      }
    };

    getData();
  }, []);

  const handleRedirectToMenu = (coffee: any) => {
    toast.success(`Viewing ${coffee.name}...`);
    setTimeout(() => {
      router.push("/menu");
    }, 1200);
  };

  return (
    <div className="third-home-container">
      <Toaster position="top-right" />

      <header>
        <h2>Enjoy a new blend of coffee style</h2>
        <p>Explore all flavours of coffee with us. There is always a new cup worth experiencing.</p>
      </header>

      {data.length > 0 && (
        <div ref={sliderRef} className="keen-slider">
          {data.map((coffee) => (
            <div key={coffee._id || coffee.id} className="keen-slider__slide">
              <section className="">
                <Image
                  src={coffee.image}
                  alt={coffee.name}
                  width={200}
                  height={100}
                  className=""
                />
                <div className="third-home-page-content">
                  <h4>{coffee.name}</h4>
                  <div className="sub-third">
                    {coffee.ingredients.map((item: string, idx: number) => (
                      <span key={idx} className="inline-block mr-2">• {item}</span>
                    ))}
                  </div>
                  <h6>₦{coffee.price.toLocaleString()}</h6>
                  <button
                    onClick={() => handleRedirectToMenu(coffee)}
                    className="order-btn"
                  >
                    View in Menu
                  </button>
                </div>
              </section>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThirdHomePage;
