import { useRouter } from "vue-router";

type Method = "HEAD" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface More {
  method: Method;
  headers: HeadersInit;
  body: any;
}

export const useFetchJSON = async (url: string, more?: More) => {
  const token: string | null = localStorage.getItem("token");

  if (!token) {
    const router = useRouter();
    router.push("/auth");
  }

  const response = await fetch(url, {
    method: more?.method,
    headers: { Authorization: `Token ${token}`, ...more?.headers },
    body: JSON.stringify(more?.body),
  });

  const getJSON = async <T>() => (await response.json()) as T;

  return { ok: response.ok, headers: response.headers, getJSON };
};
