import { Metadata } from "next";
import { Inter, Orbitron, Russo_One } from "next/font/google";
import "@/assets/styles/globals.css";
import "next-range-slider/dist/main.css";
import "react-toastify/dist/ReactToastify.css";
import BgWrapper from "@/components/BgWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAdsense from "@/components/GoogleAdsense";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="en">
      <head>
        {adsenseId && <GoogleAdsense pId={adsenseId} />}
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} ${russo.variable} antialiased`}
      >
        <SpeedInsights />
        <BgWrapper />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
