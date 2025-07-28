"use client"

import React, { useState, useMemo, useEffect } from "react";
import NavBar from "@/components/nav-bar/navbar";

export default function AdminPage() {
  const [currentMenu, setCurrentMenu] = useState(null);
  return (
    <>
      <div className="flex h-screen gap-6 p-6 app-background">
        <div className="shrink-0 basis-2xs">
          <NavBar onMenuChange={setCurrentMenu} />
        </div>
      </div>
    </>
  );
}
