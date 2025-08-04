import { fetchServer } from "@/lib/fetch-server";
import { redirect } from "next/navigation";
import DashBoardContent from "./DashBoardContent";
export default async function Temp() {
  const res = await fetchServer(
    "http://127.0.0.1:8000/api/breach/check-email-breach/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    redirect("/login");
  }

  const data = await res.json();
  return (
    <>
      <DashBoardContent breachData={data} />
    </>
  );
}
