import Logo from "./logo";
import { ArrowRight, Rocket, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
export function DashBoardNavBar() {
  return (
    <nav className="bg-navbarbackground w-full h-[60px] flex flex-row items-center shadow-md fixed">
      <Logo />
    </nav>
  );
}
