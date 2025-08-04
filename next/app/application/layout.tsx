import SidePane from "./SidePane";
import Logo from "../components/logo";
import { DashBoardNavBar } from "../components/DashBoardNavBar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden sm:block w-1/5 bg-[#0F1520] h-screen sticky top-0">
        <Logo />
        <hr className="border-gray-700 pt-2" />
        <SidePane />
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-200">
        <DashBoardNavBar />
        {children}
      </div>
    </div>
  );
}
