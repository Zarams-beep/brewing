"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, IconButton, Box } from "@mui/material";
import { CiMenuBurger } from "react-icons/ci";
import { FaXmark } from "react-icons/fa6";
import "./navBar.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useSession, signIn, signOut } from "next-auth/react";
import { persistor } from "@/store/store";
interface HeaderType {
  id: number;
  title: string;
  url: string;
  protected?: boolean;
}

export default function MediaHeaderSection() {
  const { data: session, status } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 100;
      setSticky(Math.max(1 - scrollTop / maxScroll, 0.6));
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="nav-bar-container" style={{ opacity: isSticky }}>
        <Link href="/" className="logo">
          Brewing
        </Link>

        <div className="nav-bar-media-small">
          <DarkModeToggle />
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "white" }}
          >
            <CiMenuBurger className="burger-menu" />
          </IconButton>
        </div>
      </div>

      {/* MUI Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            bgcolor: "#1e1b18",
            color: "#e6dcd1",
          },
        }}
      >
        <Box
          role="presentation"
          sx={{
            p: 3,
            height: "100vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Close Icon */}
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#D6CFE6",
              zIndex: 10,
            }}
            aria-label="close"
          >
            <FaXmark />
          </IconButton>

          <nav className="links">
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
          </nav>

          <div className="nav-btn">
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
                <button onClick={() => signIn()} className="logout">
                  Login
                </button>
                <Link href="/sign-up" className="register-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </Box>
      </Drawer>
    </>
  );
}
