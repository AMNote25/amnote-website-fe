"use client";

import React, { useState, useMemo, useEffect } from "react";
import NavBar from "@/components/nav-bar/navbar";
import PreLoader from "@/modules/admin/preloader/Preloader";

export default function AdminPage() {
  const [currentMenu, setCurrentMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const LOADER_DURATION = 1000;

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // const CurrentPageComponent = useMemo(() => {
  //   return getPageComponent(currentMenu);
  // }, [currentMenu]);

  return (
    <>
      {isLoading && (
        <PreLoader
          onComplete={handleLoaderComplete}
          duration={LOADER_DURATION}
        />
      )}
      <div className="flex h-screen gap-6 p-6 app-background">
        <div className="shrink-0 basis-2xs">
          <NavBar onMenuChange={setCurrentMenu} />
        </div>
      </div>
    </>
  );
}
