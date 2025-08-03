"use client";
import InputField from "../register/inputfield";
export default function register() {
  return (
    <div className=" h-screen grid sm:grid-cols-12 grid-cols-1">
      <div className="md:col-span-7 relative bg-green-800 shadow-neutral-800 md:block hidden">
        <img
          src="Cyberattack.svg"
          alt="Cyberattack"
          className="col-span-2 h-screen w-full object-cover absolute top-0"
        />
      </div>
      <div className="md:col-span-5 col-span-12 block">
        <InputField />
      </div>
    </div>
  );
}
