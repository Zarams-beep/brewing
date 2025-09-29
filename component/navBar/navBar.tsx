"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import "./navBar.css";
import { usePathname } from "next/navigation";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { persistor } from "@/store/store";
interface HeaderType {
  id: number;
  title: string;
  url: string;
  protected?: boolean;
}

const HeaderBar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const links: HeaderType[] = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "About", url: "/about" },
    { id: 3, title: "Menu", url: "/menu" },
    { id: 4, title: "Blog", url: "/blog", protected: true },
    { id: 5, title: "Contact", url: "/contact" },
    { id: 6, title: "Checkout", url: "/checkout", protected: true },
  ];

  const [isSticky, setSticky] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 100;
      setSticky(Math.max(1 - scrollTop / maxScroll, 0.6));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="nav-bar-container" style={{ opacity: isSticky }}>
      <div className="container">
      <Link href="/" className="logo">
        Brewing
      </Link>

      <nav className="links">
        <DarkModeToggle />

        {links.map((link) => {
          const isActive = pathname === link.url;
          const needsAuth = link.protected;

          const href =
            needsAuth && status !== "authenticated" ? "/login" : link.url;

          return (
            <Link
              key={link.id}
              href={href}
              className={isActive ? "active-link" : ""}
            >
              {link.title}
            </Link>
          );
        })}

        {status === "authenticated" ? (
          <>
            <span className="user-welcome">
              Welcome, {session?.user?.name || "user"} 👋
            </span>
            <button
              onClick={async () => {
                await signOut();
                persistor.purge();
              }}
              className="logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                signIn();
              }}
              className="logout"
            >
              Login
            </button>
            <Link href="/sign-up" className="register-link">
              Register
            </Link>
          </>
        )}
      </nav></div>
    </div>
  );
};

export default HeaderBar;
