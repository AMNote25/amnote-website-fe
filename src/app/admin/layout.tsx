// app/admin/layout.tsx
"use client";

import React, { useState } from "react";
import NavBar from "@/components/nav-bar/navbar";
import Header from "@/components/header/header";
import PreLoader from "@/modules/admin/preloader/Preloader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const LOADER_DURATION = 1000;

  const handleLoaderComplete = () => setIsLoading(false);

  return (
    <>
      {isLoading && (
        <PreLoader onComplete={handleLoaderComplete} duration={LOADER_DURATION} />
      )}
      <div className="flex h-screen gap-6 p-6 app-background">
        <div className="shrink-0 basis-2xs">
          <NavBar />
        </div>
        <div className="flex flex-col min-w-0 gap-6 grow">
          <Header />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
