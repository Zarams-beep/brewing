import type { Metadata } from "next";
import "./globals.css";
// import Footer from "@/component/Footer/Footer";
import MainLayoutSection from "@/component/General/MainLayout";
// Site info
const SITE_NAME = "Brewing";
const SITE_DESCRIPTION = "A coffee website project, created by Chizaram Chukwumaobi.";
const SITE_URL = "https://brewing.vercel.app/";
const TWITTER_HANDLE = "@Chizaram";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: ["internship", "career", "job", "coffee", "brewing", "Chizaram Chukwumaobi"],
  authors: [{ name: "Chizaram Chukwumaobi" }, { name: "Zarams-beep" }],
  creator: "Chizaram Chukwumaobi",
  publisher: "Zarams-beep",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/Macchiato.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: TWITTER_HANDLE,
    images: [
      {
        url: `${SITE_URL}/Macchiato.png`,
        alt: SITE_NAME,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/favicon-32x32.png" }],
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: "",
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "en-US": SITE_URL, "x-default": SITE_URL },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
 <body className="">
     <MainLayoutSection>
        {children}
         {/* <Footer/> */}
         </MainLayoutSection>
      </body>
    </html>
  );
}
