"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
type Feedback = {
  id: number;
  name: string;
  title: string;
  comment: string;
  image: string;
  type: string;
};

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: "Adaeze Nwankwo",
    title: "UX Designer",
    comment:
      "The aroma hits differently. This coffee gives me life every single morning! From the first sip, it feels like a full sensory experience—the flavor, the warmth, and the comforting familiarity. It has somehow become part of my creative ritual when I'm designing wireframes or iterating on prototypes. On days when I’m stuck in a mental block, this coffee literally clears the fog. It’s not just a drink; it’s a part of my process. I even associate certain design breakthroughs with specific mugs of it. I honestly can’t start my day without it, and my team knows not to talk to me until I’ve had my first cup.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60",
    type: "Latte",
  },
  {
    id: 2,
    name: "David Ojo",
    title: "Software Engineer",
    comment:
      "The attention to detail in each cup is incredible. I love the boldness! As a developer who spends countless hours deep in code, I rely heavily on small rituals to keep me grounded, and this espresso is one of them. There’s something energizing and mentally sharpening about it. I’ve tried a lot of coffee in my time, especially during hackathons and crunch weeks, but this one has the right kick without being bitter. You can tell it's crafted with care, and the flavor profile is consistent whether I’m brewing it at home or grabbing it to go. It’s now my go-to fuel for bug squashing, PR reviews, and powering through endless sprints.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60",
    type: "Espresso",
  },
  {
    id: 3,
    name: "Chinonso Umeh",
    title: "Digital Marketer",
    comment:
      "Affordable luxury at its finest. I’m absolutely obsessed with the Chai Latte! It’s more than just a drink—it’s a whole vibe. The spiced aroma, the creamy texture, and that warm hug of flavor make it the perfect companion when I’m building campaign funnels or crafting content for clients. Sometimes, I step away from analytics dashboards just to sip and reset. And honestly, it makes the brainstorming sessions feel like self-care. Even my coworkers have noticed how I light up when it’s chai time. It’s comforting, stylish, and feels like a little reward for hustling hard in this fast-paced digital world.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60",
    type: "Chai Latte",
  },
  {
    id: 4,
    name: "Zainab Yusuf",
    title: "Fashion Retailer",
    comment:
      "It's the smooth blend for me. Every sip feels like a hug from the inside out. It’s warm, comforting, and elegant—just like the statement pieces I curate for my fashion line. I love sipping it while styling looks or unpacking new collections. It’s amazing how it elevates even the quietest moments in my boutique. My clients and staff often join me for a quick cup between fittings or shoots. It’s become this little ritual that adds warmth and connection to our space. Honestly, this coffee isn’t just a beverage—it’s part of the brand aesthetic and the lifestyle we’re building.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60",
    type: "Cappuccino",
  },
  {
    id: 5,
    name: "Emmanuel Uche",
    title: "Photographer",
    comment:
      "The espresso is unmatched. Clean, rich, and just what I need during long shoots and edits. Whether I'm up early for a sunrise wedding or stuck in post-production for hours, this drink gives me the focus I need. I’ve carried it into wild locations—beaches, rooftops, even inside wedding prep rooms. There’s a clarity it brings, a kind of energy that isn’t overwhelming but definitely motivating. And not to mention—it photographs beautifully too! I’ve actually used this brand in several product flat lays because it just looks premium. It's my behind-the-scenes MVP.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60",
    type: "Espresso",
  },
];


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
    }, 4000); // auto-slide every 4 seconds
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

const SixthHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1, spacing: 15 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [AutoplayPlugin]
  );

  return (
    <div className="sixth-home-container">
      <div className="container">
      <header className="">
        <h2 className="">Our Coffee Perfection Feedback</h2>
        <p className="">Our customers have amazing things to say about us</p>
      </header>

      <div ref={sliderRef} className="keen-slider">
        {feedbacks.map(({ id, name, title, comment, image }) => (
          <div key={id} className="keen-slider__slide">
            <BiSolidQuoteAltLeft className="quote-left" />
            <p className="">
              {comment}
            </p>
            <div className="keen-main-sub">
              <div className="keen-sub">
                <h5 className="">
                  {name}
                </h5>
                <span className="">
                  {title}
                </span>
              </div>
             <div className="img-container">
               <Image
                src={image}
                alt={name}
                width={90}
                height={90}
                quality={100}
                className=""
              />
             </div>
            </div>
            <BiSolidQuoteAltRight className="quote-right" />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="left-navigate"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="right-navigate"
      >
        <FaArrowRight />
      </button>
      </div>

      {/* <Image src="/left_blast.svg" alt="left-blast" width={100} height={100} quality={100} className="left-blast2"/>    

      <Image src="/right_blast.svg" alt="right-blast" width={100} height={100} quality={100} className="right-blast2"/>     */}
    </div>
  );
};

export default SixthHomePage;
