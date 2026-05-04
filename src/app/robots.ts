import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/quiz/",
      },
    ],
    sitemap: "https://gdquiz.com/sitemap.xml",
  };
}
