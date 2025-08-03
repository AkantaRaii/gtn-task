"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
export default function InputField() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitting login form", { username, password });
    e.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/dashboard",
    });
    console.log("Response from signIn:", response);
    if (response?.ok) {
      console.log("Login successful");
      router.push("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className=" h-[500px] my-22 mx-15 flex flex-col items-center p-4">
          <h1 className="text-black font-bold text-3xl m-2">Welcome Back!</h1>
          <p className="text-gray-700 my-2 w-full text-center">
            Sign in to access your account and monitor the dark web for your
            data
          </p>
          <br />
          <div className="  w-full flex flex-col py-1 my-3">
            <label htmlFor="email" className="text-sm font-medium text-black">
              {" "}
              Username*
            </label>
            <input
              id="email"
              name="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className=" border border-gray-500 rounded-md w-full shadow-gray-500 h-10 my-1 bg-gray-50 placeholder:px-3 px-3"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="  w-full flex flex-col py-1 my-3">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
              {" "}
              Password*
            </label>
            <div className="relative w-full">
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" border border-gray-500 rounded-md w-full shadow-gray-500 h-10 my-1 bg-gray-50 placeholder:px-3 px-3"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className=" w-full flex flex-row justify-end underline text-sm text-red-500">
            <Link href={"/login/forgotpassword"} className="">
              {" "}
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="rounded-md hover:cursor-pointer bg-red-700 text-white w-full h-10 my-3 py-2"
          >
            {" "}
            Sign In
          </button>
          <div className=" w-full flex flex-row gap-4 items-center text-sm text-gray-500 py-2">
            <hr className="flex-1 border-t border-gray-300" />
            <p>Or</p>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
          <div>
            Don't have an account yet?{" "}
            <Link href="/register">
              {" "}
              <span className="text-red-700 underline">Sign up</span>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
