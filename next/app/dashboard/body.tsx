"use client";
import SidePane from "./SidePane";
import { useState } from "react";
import DashboardContent from "./DashBoardContent";
import { SessionProvider } from "next-auth/react";
import Logo from "../components/logo";
function NotificationContent() {
  return <div>Notification Alert Content Here</div>;
}
function ThreatIntelligenceContent() {
  return <div>Threat Intelligence Content Here</div>;
}

export default function Body() {
  const [currentOption, setCurrentOption] = useState("Dashboard");

  return (
    <SessionProvider>
      <div className="sm:col-span-2 bg-violet-950 hidden sm:block">
        <Logo></Logo>
        <hr className=" border-gray-700 pt-2" />
        <SidePane
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
        />
      </div>

      {/* body */}
      <div className="sm:col-span-10  bg-gray-100">
        {currentOption === "Dashboard" && <DashboardContent />}
        {currentOption === "Notification Alert" && <NotificationContent />}
        {currentOption === "Threat Intelligence" && (
          <ThreatIntelligenceContent />
        )}
      </div>
    </SessionProvider>
  );
}
