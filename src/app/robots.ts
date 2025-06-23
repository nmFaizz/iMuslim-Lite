import { siteConfig } from "@/constants/config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/surah/saved"],
        },
        sitemap: siteConfig.url,
    };
}