"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Logo from "./logo";
import { ChevronDown, User, LogOut, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export function DashBoardNavBar({ toggle }: { toggle: any }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [toggleProfile, setToggleProfile] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      console.log("asdfasdf", session.email);
      if (session?.email) {
        setEmail(session.email);
        setUsername(session.username);
      }
    };

    fetchSession();
  }, []);

  return (
    <nav className="bg-navbarbackground  h-[60px] flex flex-row items-center justify-between shadow-sm sticky top-0 z-30 px-6">
      <div onClick={() => toggle()}>
        <Menu />
      </div>
      <Logo />
      <div
        onClick={() => setToggleProfile((prev) => !prev)}
        className="relative group hover:bg-green-100 rounded-md p-1 flex flex-row gap-2 items-center"
      >
        <div className="rounded-full border border-green-500 w-9 h-9 bg-gray-200 text-center flex flex-row justify-center items-center">
          {" "}
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <h1>{username}</h1>
          <h3 className="text-xs"> {email}</h3>
        </div>
        <ChevronDown
          width={12}
          height={12}
          className={`${toggleProfile && "rotate-180"} transition duration-300`}
        />
        {toggleProfile && (
          <div className="bg-white shadow-md absolute top-full right-0 m-1 w-[230px] rounded-md">
            <div className=" w-full rounded-t-md h-10 flex flex-row justify-start px-4 gap-4 items-center ">
              <User className="w-5 h-5" />
              <h1>Profile</h1>
            </div>
            <hr className="text-gray-300" />
            <div
              onClick={() => setLogoutModal(true)}
              className=" w-full rounded-b-md h-10 flex flex-row justify-start px-4 gap-4 items-center text-red-500"
            >
              <LogOut className="w-5 h-5" />
              <h1>Logout</h1>
            </div>
          </div>
        )}
      </div>
      {logoutModal && (
        <div
          onClick={() => setLogoutModal(false)}
          className="inset-0 bg-black/50 z-50 fixed flex justify-center items-center"
        >
          <div className="w-2/5 h-1/4 bg-white rounded-md">
            <div className=" h-3/5 rounded-md pt-6 pl-4">
              <h1 className="text-xl font-bold">Confirm Logout</h1>
              <p className="text-md text-textforeground mt-1">
                Are you sure you want to log out of your account?
              </p>
            </div>
            <div className=" h-2/5 rounded-md flex-row flex justify-end pr-6 gap-5">
              <button
                onClick={() => setLogoutModal(false)}
                className="border border-gray-300 rounded-md h-3/5 px-4 font-semibold text-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  signOut();
                  // redirect("/login");
                  router.push("/login");
                }}
                className="bg-red-700 rounded-md h-3/5 px-4 text-white"
              >
                {" "}
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
