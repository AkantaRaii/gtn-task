"use client";
import { LucideProps } from "lucide-react";
import { ComponentType } from "react";
interface DashBoardProps {
  Icon: ComponentType<LucideProps>;
  text: string;
  onClick?: () => void;
  active: boolean;
}
export default function DashboardButton({
  Icon,
  text,
  onClick,
  active,
}: DashBoardProps) {
  return (
    <button
      className={`flex flex-row items-center w-full  my-2 hover:bg-violet-900 hover:scale-105 transition-transform duration-200 rounded-md px-2 ${
        active ? "bg-violet-700" : ""
      }`}
      onClick={onClick}
    >
      <Icon className="text-gray-300 w-5" />

      <span className="text-gray-300 text-md font-bold p-1 rounded-md">
        {text}
      </span>
    </button>
  );
}
