"use client";
import { fetchClient } from "@/lib/fetch-client";
import { useState } from "react";
export default function AddEmail() {
  const [email, setEmail] = useState("");
  const handleAddEmail = async () => {
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
      alert("field to add email");
    }
    alert("successfulyy added");
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
