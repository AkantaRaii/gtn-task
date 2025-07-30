import { auth } from "@/app/api/auth/[...nextauth]/route";

export const fetchServer = async (url: string, options: any) => {
  const session = await auth();
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.accessToken}` }),
    },
  });
};
