import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";
import { siteConfig } from "@/constants/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "iMuslim",
    "Islamic app",
    "Quran",
    "Prayer times",
    "Islamic calendar",
    "Doa",
    "Hadith",
    "Islamic education",
    "Muslim community",
    "Aplikasi Islami",
    "Al-Qur'an",
    "Jadwal Sholat",
    "Kalender Islam",
    "Doa-doa",
    "Hadis",
    "Pendidikan Islam",
    "Komunitas Muslim",
    "Muslim Indonesia"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
