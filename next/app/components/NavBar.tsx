import Logo from "./logo";
import { ArrowRight, Rocket, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
export function NavBar() {
  return (
    <nav className="bg-gray-100 min-h-20 flex flex-row justify-between rounded-2xl sticky top-0 shadow-2xl px-25">
      <Logo />

      {/* yo chai middle ko dropdowm menu haru ho */}
      <div className="flex flex-row items-center gap-2">
        <div className=" relative group flex flex-row hover:bg-green-100 items-center px-4 py-2 rounded-xl">
          <button className=" text-black font-bold">Security Tools</button>
          <ChevronDown className=" group-hover:rotate-180  duration-400 w-4 h-4 " />
          <div className="absolute hidden bg-red-500 group-hover:flex p-4 mt-30 w-96 shadow-lg rounded-lg z-50">
            give me a reasn
          </div>
        </div>

        <div className=" relative group flex flex-row hover:bg-green-100 items-center px-4 py-2 rounded-xl">
          <button className=" text-black font-bold">Security Tools</button>
          <ChevronDown className=" group-hover:rotate-180  duration-400 w-4 h-4 " />
          <div className="absolute hidden bg-red-500 group-hover:flex p-4 mt-30 w-96 shadow-lg rounded-lg z-50">
            give me a reasn
          </div>
        </div>

        <div className=" relative group flex flex-row hover:bg-green-100 items-center px-4 py-2 rounded-xl">
          <button className=" text-black font-bold">Security Tools</button>
          <ChevronDown className=" group-hover:rotate-180  duration-400 w-4 h-4 " />
          <div className="absolute hidden bg-red-500 group-hover:flex p-4 mt-30 w-96 shadow-lg rounded-lg z-50">
            give me a reasn
          </div>
        </div>

        <div className=" relative group flex flex-row hover:bg-green-100 items-center px-4 py-2 rounded-xl">
          <button className=" text-black font-bold">Security Tools</button>
          <ChevronDown className=" group-hover:rotate-180  duration-400 w-4 h-4 " />
          <div className="absolute hidden bg-red-500 group-hover:flex p-4 mt-30 w-96 shadow-lg rounded-lg z-50">
            give me a reasn
          </div>
        </div>
      </div>

      {/* right side dns scan ra getstarted ko */}
      <div className=" flex flex-row gap-3">
        <button className=" border-[#b83223] border-2 rounded-full flex flex-row items-center px-6 py-2.5 my-4 gap-2 text-[#b83223] hover:bg-[#b83223]/10  hover:text-[#b83223]">
          <Search className=" w-4 h-4 " />
          <p className=" ">DNS Scan</p>
          <ArrowRight className=" w-4 h-4 " />
        </button>
        <Link href="/application/dashboard">
          <button className="bg-[#72b823] border-[#72b823] border-2 rounded-full flex flex-row items-center px-6 py-2.5 my-4 gap-2 text-white hover:bg-lime-200 hover:text-[#72b823]">
            <Rocket className=" w-4 h-4 " />
            <p className=" ">Get Started</p>
            <ArrowRight className=" w-4 h-4 " />
          </button>
        </Link>
      </div>
    </nav>
  );
}
