"use client";
import { LayoutDashboard } from "lucide-react";
import DashboardButton from "./DashBoardButton";
import { LayoutDashboardIcon, Bell, Info } from "lucide-react";
import { useState } from "react";
import { redirect } from "next/navigation";
interface SidePaneProps {
  currentOption: string;
  setCurrentOption: (option: string) => void;
}
export default function SidePane() {
  const [currentOption, setCurrentOption] = useState("Dashboard");
  return (
    <div className="p-2">
      <DashboardButton
        Icon={LayoutDashboardIcon}
        text={"Dashboard"}
        onClick={() => {
          setCurrentOption("Dashboard");
          redirect("/application/dashboard");
        }}
        active={currentOption === "Dashboard"}
      />
      <DashboardButton
        Icon={Bell}
        text={"Email Monitoring"}
        onClick={() => {
          setCurrentOption("Email Monitoring");
          redirect("/application/emailmonitor");
        }}
        active={currentOption === "Email Monitoring"}
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
