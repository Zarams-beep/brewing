"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Blog = () => {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
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

  return (
    <div className="blog-container">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        navigation
        className="swiper-main-blog"
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <Link href={`/blog/${item._id}`} className="block group">
              <div className="blog-slide">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={500}
                  height={300}
                  quality={100}
                  className=""
                />
                <div className="blog-sub-slide">
                  <h2 className="">{item.title}</h2>
                  <p className="">{item.desc}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Blog;
