"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyOTP() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next box
    if (value && index < otp.length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      (next as HTMLInputElement)?.focus();
    }
  };
  const handleSubmit = async () => {
    const code = otp.join("");
    const res = await fetch("http://127.0.0.1:8000/api/auth/verify/otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: code,
      }),
    });
    if (res.ok) {
      redirect("/login");
    }
  };
  const handleResendOTP = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/auth/sendotp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (res.ok) {
      alert("OTP resent successfully!");
    } else {
      const errData = await res.json();
      alert(errData?.error || "Failed to resend OTP");
    }
  };
  return (
    <div className=" h-screen flex flex-col justify-center px-[100px]">
      <div className=" flex flex-row justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
          <p className="text-textforeground mb-8">
            You need to verify your email in order to proceed further. We've
            <br />
            sent a verification code to your email. Please enter it below.
          </p>
          <label className="text-sm font-medium text-gray-700 ">
            {" "}
            Enter verification code
          </label>
          <div className=" flex flex-row justify-center gap-2 mt-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-10 h-10 text-center border rounded-md border-gray-500 m-1"
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-red-800 w-full mt-8 rounded-md h-10 text-white hover:bg-red-700 hover:scale-105 transition duration-300"
          >
            {" "}
            Verify Account
          </button>
          <div className="mt-10 text-center">
            <p>
              Didn't receive a code?{" "}
              <span
                onClick={handleResendOTP}
                className="text-red-700 underline active:text-blue-900 hover:text-red-500"
              >
                Resend OTP
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
