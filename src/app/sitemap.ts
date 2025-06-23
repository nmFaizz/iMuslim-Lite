import { siteConfig } from "@/constants/config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
        },
        {
            url: `${siteConfig.url}/surah`,
            lastModified: new Date(),
        },
        {
            url: `${siteConfig.url}/jadwal-sholat`,
            lastModified: new Date(),   
        },
        {
            url: `${siteConfig.url}/doa`,
            lastModified: new Date(),
        },
    ]
}