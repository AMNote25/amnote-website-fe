import { useState } from "react";
import Icon from "../ui/icon";
import Language from "./language";

export default function Header() {
  return (
    <header className="px-6 py-3 transition-colors duration-300 border-b rounded-2xl header-bg header-border header-shadow">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-1 min-w-0 mr-4">
            <Language />
        </div>
      </div>
    </header>
  );
}
