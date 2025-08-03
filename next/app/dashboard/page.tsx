import { fetchServer } from "@/lib/fetch-server";
import { redirect } from "next/navigation";
import Body from "./body";
export default async function Temp() {
  let data: any = null;
  try {
    const res = await fetchServer("http://127.0.0.1:8000/api/auth/me/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      redirect("/login");
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    redirect("/login");
  }
  try {
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
      throw new Error("Server error");
    }

    data = await res.json();
    console.log(data?.email_record); // can see data inside in browser console
  } catch (error) {
    console.error("Error fetching breach data:", error);
    // failed ko UI banayera dekhauda hunxa or someting went wrong ko
  }
  return <Body data={data} />;
}
{
  /* <div className="grid sm:grid-cols-12 min-h-screen grid-cols-1">
 
</div>; */
}
