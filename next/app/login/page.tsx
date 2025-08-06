import { fetchServer } from "@/lib/fetch-server";
import InputField from "./inputfield";
import { redirect } from "next/navigation";
export default async function login() {
  const res = await fetchServer(`${process.env.BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    redirect("/");
  }
  return (
    <div className=" h-screen grid sm:grid-cols-12 grid-cols-1">
      <div className="md:col-span-7 relative bg-green-800 shadow-neutral-800 md:block hidden">
        <img
          src="Cyberattack.svg"
          alt="Cyberattack"
          className="col-span-2 h-screen w-full object-cover absolute top-0"
        />
      </div>
      <div className="md:col-span-5  col-span-12 block">
        <InputField />
      </div>
    </div>
  );
}
