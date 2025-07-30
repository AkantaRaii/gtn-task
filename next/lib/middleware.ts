// import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const isAuth = !!token?.access_token;
//   if (!isAuth) {
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("callbackUrl", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/dashboard/:path*"], // Protects /dashboard and any subroutes
// };
