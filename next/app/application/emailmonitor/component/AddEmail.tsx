"use client";
import { fetchClient } from "@/lib/fetch-client";
import { useState } from "react";
import { toast } from "react-toastify";
export default function AddEmail({
  onEmailAdded,
}: {
  onEmailAdded: (email: any) => void;
}) {
  const [email, setEmail] = useState("");
  const handleAddEmail = async () => {
    const toastId = toast.loading("Requesting");
    const res = await fetchClient(
      "http://127.0.0.1:8000/api/breach/monitoredemail/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const data = await res.json();
    if (res.status != 201) {
      toast.update(toastId, {
        type: "error",
        render: "Failed to add email ",
        isLoading: false,
        autoClose:4000, 
        closeOnClick: true,
      });
    }
    onEmailAdded(email); // Update parent state
    setEmail("");
    toast.update(toastId, {
      type: "success",
      render: "Email successfully added to monitor ",
      isLoading: false,
      autoClose:4000, 
      closeOnClick: true,
    });
  };
  return (
    <div>
      <h1 className="font-bold mb-1">Email Address</h1>
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 border-2 border-gray-300 rounded-md p-2 w-full mb-4"
        placeholder="example@domain.com"
      />
      <button
        onClick={handleAddEmail}
        className="bg-red-700 text-white w-full h-10 rounded-md shadow-md  hover:scale-105 transition duration-200"
      >
        Add Email to monitor
      </button>
    </div>
  );
}
