"use client"

import React, { useState, useMemo, useEffect } from "react";
import NavBar from "@/components/nav-bar/navbar";

export default function AdminPage() {
  const [currentMenu, setCurrentMenu] = useState(null);
  return (
    <>
      <div className="flex h-screen gap-6 p-6 app-background">
        {/* Sidebar: fixed width */}
        <div className="shrink-0 basis-[220px]">
          <NavBar onMenuChange={setCurrentMenu} />
        </div>
      </div>
    </>
  );
}
