"use client";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <div className="mb-14 mt-2">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 w-fit h-fit rounded-xl">
          <img
            src="/logo_green.png"
            alt="logo"
            className="w-[200px] h-[38px]"
          />
        </div>
      </div>

      <div className="">
        <img src="/404.svg" alt="" className="w-[300px] h-[300px]" />
      </div>
      <h2 className=" text-2xl font font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-textforeground text-center mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => router.push("/")}
        className=" bg-red-700 px-4 py-2 text-white rounded-md"
      >
        {" "}
        Home{" "}
      </button>
    </div>
  );
}
