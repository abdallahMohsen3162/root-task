"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => { 
    require("bootstrap/dist/js/bootstrap");
  }, [])
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
