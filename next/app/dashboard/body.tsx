"use client";
import SidePane from "./SidePane";
import { useState } from "react";
import DashboardContent from "./DashBoardContent";
import { SessionProvider } from "next-auth/react";
import Logo from "../components/logo";
interface Props {
  data: any;
}
function NotificationContent() {
  return <div>Notification Alert Content Here</div>;
}
function ThreatIntelligenceContent() {
  return <div>Threat Intelligence Content Here</div>;
}

export default function Body({ data }: any) {
  const [currentOption, setCurrentOption] = useState("Dashboard");
  console.log(data); // undefined in console
  return (
    <SessionProvider>
      <div className="sm:col-span-2 bg-[#0F1520] hidden sm:block">
        <Logo></Logo>
        <hr className=" border-gray-700 pt-2" />
        <SidePane
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
        />
      </div>

      {/* body */}
      <div className="sm:col-span-10  bg-gray-100">
        {currentOption === "Dashboard" && (
          <DashboardContent breachData={data} />
        )}
        {currentOption === "Notification Alert" && <NotificationContent />}
        {currentOption === "Threat Intelligence" && (
          <ThreatIntelligenceContent />
        )}
      </div>
    </SessionProvider>
  );
}
