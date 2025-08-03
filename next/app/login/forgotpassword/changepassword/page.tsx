"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
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

export default function page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  //for password visiblity
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

  const submitHandler = async () => {
    if (!handlePasswordChange(password)) {
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    const tempToken = sessionStorage.getItem("temp_forgotpass_token");
    if (!tempToken) {
      alert("Session expired. Please restart the password reset process.");
      return;
    }

    // try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/reset-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temp_token: tempToken,
        new_password: password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      sessionStorage.removeItem("temp_forgotpass_token"); // cleanup
      redirect("/login"); // or router.push("/login") if using useRouter
    } else {
      alert(data.error || "Failed to reset password");
    }
    // } catch (error) {
    //   console.error("Error resetting password:", error);
    //   alert("Something went wrong. Please try again.");
    // }
  };

  return (
    <div className=" h-screen flex flex-col justify-center px-[100px]">
      <div className=" flex flex-row justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-textforeground mb-8">
            Create new password for your account
          </p>
          <div className="  w-full flex flex-col py-1 mt-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
              Password*
            </label>
            <div className="relative w-[400px]">
              <input
                id="password"
                name="password"
                value={password}
                onFocus={() => setConfirmPasswordError("")}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                className=" border border-gray-500 rounded-md w-full shadow-gray-500 h-10 my-1 bg-gray-50 placeholder:px-3 px-3"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-4 text-gray-600"
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
            <div className="relative w-[400px]">
              <input
                id="cpassword"
                name="password"
                value={confirmPassword}
                onFocus={() => setConfirmPasswordError("")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" border border-gray-500 rounded-md w-full shadow-gray-500 h-10 my-1 bg-gray-50 placeholder:px-3 px-3"
                type={showCPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                onClick={() => setShowCPassword((prev) => !prev)}
                className="absolute right-3 top-4 text-gray-600"
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
            onClick={submitHandler}
            className="bg-red-800 w-full mt-8 rounded-md h-10 text-white hover:bg-red-700 hover:scale-105 transition duration-300"
          >
            {" "}
            Set New Password
          </button>
        </div>
      </div>
    </div>
  );
}
