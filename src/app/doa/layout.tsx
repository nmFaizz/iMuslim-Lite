import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daftar Doa",
    description: "Kumpulan doa-doa harian yang dapat membantu Anda dalam beribadah.",
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
