"use client";
import React from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

type CoffeeItem = {
  id: number;
  title: string;
  image: string;
  ingredients: string[];
  price: string;
};

const coffeeList: CoffeeItem[] = [
  { id: 1, title: "Cappuccino", image: "/Cappuccino.png", ingredients: ["Bold", "Strong"], price: "₦800" },
  { id: 2, title: "Chai Latte", image: "/Chai_Latte.png", ingredients: ["Foamy", "Milky"], price: "₦1000" },
  { id: 3, title: "Macchiato", image: "/Macchiato.png", ingredients: ["Creamy", "Smooth"], price: "₦1200" },
  { id: 4, title: "Espresso", image: "/Expresso.png", ingredients: ["Rich", "Dark"], price: "₦900" },
  { id: 5, title: "Latte", image: "/img-6.jpg", ingredients: ["Silky", "Sweet"], price: "₦1100" },
];

// Autoplay plugin
function AutoplayPlugin(slider: any) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2000);
  }

  slider.on("created", () => {
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
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
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

  return (
    <div className="third-home-container">
      <header>
        <h2 className="">
          Enjoy a new blend of coffee style
        </h2>
        <p className="">
          Explore all flavours of coffee with us. There is always a new cup worth experiencing.
        </p>
      </header>

      <div ref={sliderRef} className="keen-slider">
        {coffeeList.map((coffee) => (
          <div key={coffee.id} className="keen-slider__slide">
            <section className="">
              <Image
                src={coffee.image}
                alt={coffee.title}
                width={200}
                height={100}
                className=""
              />
              <div className="third-home-page-content">
                <h4 className="">
                {coffee.title}
              </h4>
              <div className="sub-third">
                {coffee.ingredients.map((item, idx) => (
                  <span key={idx} className="inline-block mr-2"> <span>•</span> {item}</span>
                ))}
              </div>
              <h6 className="">
                {coffee.price}
              </h6>
              <button className="">
                Order
              </button>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdHomePage;
