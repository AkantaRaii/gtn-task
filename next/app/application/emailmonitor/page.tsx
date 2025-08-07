import { fetchServer } from "@/lib/fetch-server";
import { redirect } from "next/navigation";
import MonioringContent from "./component/content";
export default async function page() {
  const res = await fetchServer(
    "http://127.0.0.1:8000/api/breach/monitoredemail/",
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

  return <div>
    <MonioringContent data={data}/>
  </div>;
}
