import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدار — تعلم وتطور",
  description: "منصة تعليمية تفاعلية للأطفال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Cairo:wght@400;600;700;800;900&family=Baloo+2:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
