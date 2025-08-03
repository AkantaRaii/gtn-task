import { getSession } from "next-auth/react";
export async function fetchClient(url: string, options: any) {
  const session: any = await getSession();
  const token = session?.accessToken;
  if (token) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });
  }
}
