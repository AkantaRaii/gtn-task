import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const response = await fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: response.status }
    );
  }

  const data = await response.json();
  const res = NextResponse.json({ message: "Login successful", staus: 200 });
  res.cookies.set("access_token", data.access, {
    httpOnly: true,
  });
  res.cookies.set("refresh_token", data.refresh, {
    httpOnly: true,
  });
  return res;
}
