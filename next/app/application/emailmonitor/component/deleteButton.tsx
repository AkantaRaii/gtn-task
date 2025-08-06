"use client";
import { fetchClient } from "@/lib/fetch-client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
export default function DeleteButton({
  deleteFunc,
  email,
}: {
  deleteFunc: (email: any) => void;
  email: any;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const res = await fetchClient(
      "http://127.0.0.1:8000/api/breach/monitoredemail/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    if (res.ok) {
      deleteFunc(email);
      toast.success(" Email Deleted Successfully");
    } else {
      toast.error("Email Deletion Failed");
    }
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-black hover:bg-red-400 rounded-md p-1"
      >
        <Trash2 width={20} />
      </button>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="bg-black/30 fixed z-50 inset-0  flex items-center justify-center"
        >
          <div className="bg-white w-1/3 h-1/3 rounded-md p-4">
            <h1 className="text-center text-xl font-bold">Delete Email</h1>
            <p className="text-md text-center mb-2">
              Are you sure you want to Delete{" "}
              <span className="font-semibold">{email}</span>?
            </p>
            <div className="h-1/3 w-full bg-orange-100 mb-3 rounded-r-md rounded-t-md px-2">
              <div className="h-[2px] bg-red-700 w-full"></div>
              <h1 className="text-red-700 text-md"> Warning</h1>
              <p className="text-sm text-red-600">
                By deleting this email you wont be abe to monitor this email.
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                {" "}
                cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-700 text-white px-4 py-2 rounded-md"
              >
                {" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
