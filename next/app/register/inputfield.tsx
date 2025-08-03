"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
interface DataType {
  message: string;
  errors: { username: string; email: string };
}

function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  //   errors.push("Password must contain at least one special character.");
  // }

  return errors;
}

export default function InputField() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  //password visiblity states
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  useEffect(() => {
    const errors = validatePassword(password);
    if (passwordTouched) {
      setPasswordError(errors);
    }
  }, [password, passwordTouched]);
  const handlePasswordChange = (value: string) => {
    const errors = validatePassword(value);
    return errors.length === 0; // stack errors with newline
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handlePasswordChange(password)) {
      return;
    }
    if (password != confirmPassword) {
      setConfirmPasswordError("Password do not match");
      return;
    }
    console.log(username + email + password);
    const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    if (res.ok) {
      redirect(`/login/verifyotp?email=${encodeURIComponent(email)}`);
    }
    const data: DataType = await res.json();
    data.errors.username == null ? "" : setUsernameError(data.errors.username);
    data.errors.email == null ? "" : setEmailError(data.errors.email);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className=" h-[500px] mt-12 mx-20 flex flex-col items-center p-4">
          <h1 className="text-black font-bold text-3xl m-1">
            Create an Account
          </h1>
          <p className="text-gray-700 mt-1 w-full text-center">
            Sign up to start monitoring the dark web for your data
          </p>
          <br />
          {/* username */}
          <div className=" w-full flex flex-col py-1 mt-1">
            <label htmlFor="email" className="text-sm font-medium text-black">
              {" "}
              Username*
            </label>
            <input
              id="username"
              name="username"
              value={username}
              onFocus={() => setUsernameError("")}
              onChange={(e) => setUsername(e.target.value)}
              className=" border border-gray-500 rounded-md w-full shadow-gray-500 h-8 my-1 bg-gray-50 placeholder:px-3 px-3"
              type="text"
              placeholder="Enter your username"
            />
            <div className="text-red-500 px-2 text-sm">{usernameError}</div>
          </div>
          {/* email */}
          <div className="  w-full flex flex-col py-1 mt-1">
            <label htmlFor="email" className="text-sm font-medium text-black">
              {" "}
              Email*
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onFocus={() => setEmailError("")}
              onChange={(e) => setEmail(e.target.value)}
              className=" border border-gray-500 rounded-md w-full shadow-gray-500 h-8 my-1 bg-gray-50 placeholder:px-3 px-3"
              type="email"
              placeholder="example@gmail.com"
            />
            <div className="text-red-500 px-2 text-sm"> {emailError}</div>
          </div>
          <div className="  w-full flex flex-col py-1 mt-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
              Password*
            </label>
            <div className="relative w-full">
              <input
                id="password"
                name="password"
                value={password}
                onFocus={() => setConfirmPasswordError("")}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                className=" border border-gray-500 rounded-md w-full shadow-gray-500 h-8 my-1 bg-gray-50 placeholder:px-3 px-3"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError.length > 0 && (
              <ul className="text-red-500 px-2 text-sm">
                {passwordError.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="  w-full flex flex-col py-1 mt-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
              confirm Password*
            </label>
            <div className="relative w-full">
              <input
                id="password"
                name="password"
                value={confirmPassword}
                onFocus={() => setConfirmPasswordError("")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" border border-gray-500 rounded-md w-full shadow-gray-500 h-8 my-1 bg-gray-50 placeholder:px-3 px-3"
                type={showCPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                onClick={() => setShowCPassword((prev) => !prev)}
              >
                {showCPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-red-500 px-2 text-sm">
              {" "}
              {confirmPasswordError}
            </div>
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
          <div className="">
            already have an account? {"  "}
            <Link href="/register">
              <span className="text-red-700 underline">Log in</span>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
