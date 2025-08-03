"use client";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function page() {
  const [email, setEmail] = useState("");
  const handleProceed = async () => {
    console.log("button pressed");
    const res = await fetch("http://127.0.0.1:8000/api/auth/sendotp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      redirect(
        `/login/forgotpassword/verifyotp?email=${encodeURIComponent(email)}`
      );
    }
    alert(data.error);
  };
  return (
    <div className=" h-screen flex flex-col justify-center px-[100px]">
      <div className=" flex flex-row justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
          <p className="text-textforeground mb-8">
            Enter your email address and we'll send you an OTP email to
            <br />
            reset your password.
          </p>
          <label className=" font-medium text-black text-md "> Email*</label>
          <div className="">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-400 h-10 focus:border-2 focus:border-red-600 border-1 w-full rounded-md"
            />
          </div>

          <button
            onClick={handleProceed}
            className="bg-red-800 w-full mt-8 rounded-md h-10 text-white hover:bg-red-700 hover:scale-105 transition duration-300"
          >
            {" "}
            Proceed
          </button>
          <div className="mt-10 text-center">
            <p>
              Remember your password?{" "}
              <Link href="/login" className="text-red-700">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
