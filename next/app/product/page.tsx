import { fetchClient } from "@/lib/fetch-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function Dahsbaord() {
  const res = await fetchClient("http://127.0.0.1:8000/api/auth/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    if (res.status == 401) {
      console.log("Unauthorized access, redirecting to login");
      redirect("/login");
    }
  }
  const { products } = await res.json();

  return (
    <>
      <h1 className="text-2xl text-center"> Trhis is Dash Board</h1>
      <ol>
        {products.map((product: any) => (
          <li key={product.id}>
            {product.name} : {product.price}
          </li>
        ))}
      </ol>
    </>
  );
}
