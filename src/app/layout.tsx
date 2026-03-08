import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whiskey Blog",
  description: "Personal site and blog by a Java engineer building on the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
