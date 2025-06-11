import type { Metadata } from "next";
import { Inter, Orbitron, Russo_One } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const russo = Russo_One({
  variable: "--font-russo",
  subsets: ["cyrillic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "GD Quiz",
  description:
    "Test your skills by ranking the hardest levels from most impossible to easiest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} ${russo.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
