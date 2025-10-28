"use client";

import { useEffect } from "react";

interface AdUnitProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Google AdSense Ad Unit Component
 *
 * Usage:
 * <AdUnit
 *   adSlot="1234567890"
 *   adFormat="auto"
 *   fullWidthResponsive={true}
 * />
 */
export default function AdUnit({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
  className = "",
}: AdUnitProps) {
  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV === "production") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  // Don't show ads in development
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center ${className}`}
        style={{ minHeight: "250px", ...style }}
      >
        <p className="text-gray-400 text-center px-4">
          📢 Ad Placeholder<br />
          <span className="text-sm">(Ads only show in production)</span>
        </p>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
}
