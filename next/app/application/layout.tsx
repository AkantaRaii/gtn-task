"use client";

import { DashBoardNavBar } from "../components/DashBoardNavBar";
import SidePaneShell from "./dashboard/component/SidePaneShell";
import { useState } from "react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideBarVisible, setIsSidebarVisible] = useState(true);
  const toggle = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  return (
    <div className="grid grid-cols-12 min-h-screen">
      {isSideBarVisible && <SidePaneShell state={true} />}
      <div
        className={`${
          isSideBarVisible ? "lg:col-span-10" : "col-span-12"
        } w-full col-span-12`}
      >
        <DashBoardNavBar toggle={toggle} />
        <div className="overflow-y-auto bg-gray-200">{children}</div>
      </div>
    </div>
  );
}
