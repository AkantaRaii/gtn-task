"use client";
import InputField from "../login/inputfield";
export default function register() {
  return (
    <div className=" h-screen grid sm:grid-cols-12 grid-cols-1">
      <div className="md:col-span-8 relative bg-green-800 shadow-neutral-800 md:block hidden">
        <img
          src="Cyberattack.svg"
          alt="Cyberattack"
          className="col-span-2 h-screen w-full object-cover absolute top-0"
        />
      </div>
      <div className="md:col-span-4 col-span-12 block">
        <InputField />
      </div>
    </div>
  );
}
