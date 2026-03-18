import { Metadata } from "next";
import { Inter, Orbitron, Russo_One } from "next/font/google";
import "@/assets/styles/globals.css";
import "next-range-slider/dist/main.css";
import "react-toastify/dist/ReactToastify.css";
import BgWrapper from "@/components/ui/BgWrapper";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const russo = Russo_One({
  subsets: ["cyrillic"],
  variable: "--font-russo",
  weight: "400",
});

export const metadata: Metadata = {
  title: "GD Quiz",
  description:
      "Test your skills by ranking the hardest levels from most impossible to easiest",
  keywords:
      "gd, geometry dash, quiz, game, levels, impossible, hardest, easiest, demonlist, demon list, global demonlist, global demon list, hardest levels, hardest levels in geometry dash, hardest levels in gd, hardest levels in geometry dash, hardest levels in gd, impossible levels, impossible levels in geometry dash, impossible levels in gd, demon list quiz, global demon list quiz, global demonlist quiz, demonlist quiz, geometry dash quiz, gd quiz, demonlist challenge, global demonlist challenge, demon list challenge, geometry dash challenge, gd challenge, quiz challenge, hardest levels challenge, impossible levels challenge, impossible levels in geometry dash challenge, impossible levels in gd challenge, hardest levels in geometry dash challenge, hardest levels in gd challenge",
  icons: {
    icon: "/favicon.ico",
  },
};

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
      <html lang="en">
      <body
          className={`${inter.variable} ${orbitron.variable} ${russo.variable} antialiased`}
      >
      <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2548493071724055"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
      />
      <SpeedInsights />
      <BgWrapper />
      <Header />
      <main>{children}</main>
      <Footer />
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          theme="dark"
      />
      </body>
      </html>
  );
};

export default MainLayout;