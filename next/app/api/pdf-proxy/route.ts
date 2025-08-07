// app/api/pdf-proxy/route.ts  (Next.js 13+ app router style)
import { NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await auth();

  if (!session || !session.accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const backendRes = await fetch(
    "http://localhost:8000/api/breach/report/download/",
    {
        method:"GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!backendRes.ok) {
    return new NextResponse("Failed to fetch PDF", {
      status: backendRes.status,
    });
  }

  const buffer = await backendRes.arrayBuffer();

  return new NextResponse(Buffer.from(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="breach_report.pdf"',
    },
  });
}
