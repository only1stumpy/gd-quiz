"use client";
import { useLocales } from "@/hooks/useLocales";

type Props = {
  children: React.ReactNode;
};

export default function HtmlWrapper(props: Props) {
  const { language } = useLocales();

  return <html lang={language} suppressHydrationWarning>{props.children}</html>;
}
