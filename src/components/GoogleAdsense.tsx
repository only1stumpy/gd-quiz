import Script from "next/script";

interface GoogleAdsenseProps {
  pId: string;
}

/**
 * Google AdSense script component
 * Add this to your layout to enable AdSense on your site
 */
export default function GoogleAdsense({ pId }: GoogleAdsenseProps) {
  if (!pId || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
