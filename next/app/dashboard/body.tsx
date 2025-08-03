"use client";
import { useState } from "react";
import SidePane from "./SidePane";
import DashboardContent from "./DashBoardContent";
import { SessionProvider } from "next-auth/react";
import Logo from "../components/logo";
import { DashBoardNavBar } from "../components/DashBoardNavBar";

export default function Body({ data }: { data: any }) {
  const [currentOption, setCurrentOption] = useState("Dashboard");
  return (
    <SessionProvider>
      <div className="flex min-h-screen"> 
        <div className="hidden sm:block w-1/5 bg-[#0F1520] h-screen sticky top-0">
          <Logo />
          <hr className="border-gray-700 pt-2" />
          <SidePane
            currentOption={currentOption}
            setCurrentOption={setCurrentOption}
          />
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-200">
          <DashBoardNavBar />
          {currentOption === "Dashboard" && (
            <DashboardContent breachData={data} />
          )}
          {currentOption === "Notification Alert" && <div>Alert</div>}
          {currentOption === "Threat Intelligence" && <div>Intel</div>}
        </div>
      </div>
    </SessionProvider>
  );
}
