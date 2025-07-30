import { fetchServer } from "@/lib/fetch-server";
import { redirect } from "next/navigation";
import Body from "./body";

export default async function Temp() {
  const res = await fetchServer("http://127.0.0.1:8000/api/auth/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    redirect("/login");
  }

  return (
    <div className="grid sm:grid-cols-12 min-h-screen grid-cols-1">
      <Body></Body>
    </div>
  );
}
