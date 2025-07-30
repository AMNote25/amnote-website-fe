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
        <head>
          <link rel="icon" type="image/svg+xml" href="/AMnote_minilogo.svg" />
          <title>AMnote | Phần mềm kế toán nè</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
