import axios from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import { jwtDecode } from "jwt-decode";
async function refreshToken(token: any) {
  if (token && token.refreshToken) {
    const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });
    const response = await res.json();
    if (res.ok) {
      return {
        ...token,
        accessToken: response.access,
      };
    } else {
      return token;
    }
  }
}
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/token/", {
            username: credentials?.username,
            password: credentials?.password,
          });

          const data = res.data;
          if (data) {
            return {
              id: data.user.id,
              username: data.user.username,
              email: data.user.email,
              accessToken: data.access,
              refreshToken: data.refresh,
            };
          } else {
            return null; // Return null if no data is received
          }
        } catch (err) {
          throw Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // ✅ now TS recognizes this is a valid literal
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: any;
      account: any;
      user?: any;
    }) {
      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);
        if (decodedToken?.exp !== undefined) {
          token.accessTokenExpires = decodedToken.exp * 1000;
        }
      }
      if (user && account) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          username: user.username,
          id: user.id,
          email: user.email,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshToken(token);
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.accessToken = token.accessToken || "";
        session.refreshToken = token.refreshToken || "";
        session.username = token.username;
        session.id = token.id;
        session.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
const auth = () => getServerSession(authOptions);
export { auth };
