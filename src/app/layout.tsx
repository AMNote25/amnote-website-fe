"use client";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.remove("mdl-js");
  }, []);

  return (
    <>
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
