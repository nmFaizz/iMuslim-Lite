import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jadwal Sholat",
    description: "Dapatkan jadwal sholat harian sesuai lokasi Anda.",
}
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
