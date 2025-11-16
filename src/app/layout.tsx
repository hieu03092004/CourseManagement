// src/app/layout.tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

// CSS/global styles dùng cho toàn app
import "../styles/app.scss";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Course Management",
  description: "Course Management",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Root layout chỉ bọc font + providers chung. Không render Header/Footer ở đây */}
      <body className={`${beVietnamPro.variable} antialiased`}>{children}</body>
    </html>
  );
}
