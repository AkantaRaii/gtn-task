"use client";
import { LayoutDashboard } from "lucide-react";
import DashboardButton from "./DashBoardButton";
import { LayoutDashboardIcon, Bell, Info } from "lucide-react";
import { useState } from "react";
interface SidePaneProps {
  currentOption: string;
  setCurrentOption: (option: string) => void;
}
export default function SidePane({
  currentOption,
  setCurrentOption,
}: SidePaneProps) {
  return (
    <div className="p-2">
      <DashboardButton
        Icon={LayoutDashboardIcon}
        text={"Dashboard"}
        onClick={() => setCurrentOption("Dashboard")}
        active={currentOption === "Dashboard"}
      />
      <DashboardButton
        Icon={Bell}
        text={"Notification Alert"}
        onClick={() => setCurrentOption("Notification Alert")}
        active={currentOption === "Notification Alert"}
      />
      <DashboardButton
        Icon={Info}
        text={"Threat Intelligence"}
        onClick={() => setCurrentOption("Threat Intelligence")}
        active={currentOption === "Threat Intelligence"}
      />
    </div>
  );
}
