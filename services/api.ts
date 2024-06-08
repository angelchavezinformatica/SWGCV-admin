import { useRouter } from "vue-router";

type Method = "HEAD" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface More {
  protected?: boolean;
  method?: Method;
  headers?: HeadersInit;
  body?: any;
}

export const useFetchJSON = async (url: string, more?: More) => {
  const router = useRouter();
  const token: string | null = localStorage.getItem("token");

  if (!token) router.push("/auth");

  const response = await fetch(url, {
    method: more?.method,
    headers: { Authorization: `Token ${token}`, ...more?.headers },
    body: JSON.stringify(more?.body),
  });

  if (more?.protected !== false && response.status === 401)
    router.push("/auth");

  const getJSON = async <T>() => (await response.json()) as T;

  return { ok: response.ok, headers: response.headers, getJSON, response };
};
