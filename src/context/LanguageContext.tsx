"use client";
import { createContext, useContext, useState, useEffect } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    const savedLanguage = localStorage.getItem("gdquiz-language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("gdquiz-language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
