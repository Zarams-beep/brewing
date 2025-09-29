"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type SubscribeSchema = z.infer<typeof subscribeSchema>;

import {
  TiSocialLinkedinCircular,
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular,
} from "react-icons/ti";
import "./footer.css";

const Footer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SubscribeSchema>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = (data: SubscribeSchema) => {
    console.log("Subscribed with:", data.email);
    reset();
  };

  return (
    <footer className="footer-container">
      {/* Floating cups */}
        <Image src="/cup-5.png" alt="floating cup" width={100} height={100} className="footer-float-img" />
      <Image src="/cup-2.png" alt="floating cup" width={100} height={100} className="footer-float-img-2" />

      {/* Newsletter Subscription */}
      <section className="footer-newsletter">
        <div className="container">
        <h2 className="footer-heading">Subscribe to get the Latest News</h2>
        <p className="footer-description">Don’t miss out on our latest news, updates, tips and special offers</p>

        <form onSubmit={handleSubmit(onSubmit)} className="footer-subscribe">
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="footer-input"
          />
          <button type="submit" className="footer-button">
            Subscribe
          </button>
        </form>
        {errors.email && <p className="footer-error">{errors.email.message}</p>}
        {isSubmitSuccessful && <p className="footer-success">Thanks for subscribing! 🎉</p>}
        </div>
      </section>

      {/* Footer Links */}
      <div className="footer-links">
        <div className="container">
        <section className="footer-section">
          <h3 className="footer-section-title">Brewing</h3>
          <p className="footer-section-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.
          </p>
          <div className="footer-icons">
            <TiSocialLinkedinCircular className="footer-icon" />
            <TiSocialFacebookCircular className="footer-icon" />
            <TiSocialInstagramCircular className="footer-icon" />
            <TiSocialTwitterCircular className="footer-icon" />
          </div>
        </section>

        <section className="footer-section-1">
          <h5 className="footer-section-title">About</h5>
          <p>Menu</p>
          <p>Features</p>
          <p>News & Blogs</p>
          <p>Help & Support</p>
        </section>

        <section className="footer-section-1">
          <h5 className="footer-section-title">Company</h5>
          <p>How we work</p>
          <p>Terms of service</p>
          <p>Pricing</p>
          <p>FAQ</p>
        </section>

        <section className="footer-section-1">
          <h5 className="footer-section-title">Contact Us</h5>
          <p>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
          <p>+1 202-918-2132</p>
          <p>beanscene@mail.com</p>
          <p>www.beanscene.com</p>
        </section></div>
      </div>
    </footer>
  );
};

export default Footer;
