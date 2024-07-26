import { useRouter } from "vue-router";

type Method = "HEAD" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface More {
  protected?: boolean;
  method?: Method;
  headers?: HeadersInit;
  body?: any;
}

export const usePFetch = () => {
  const router = useRouter();

  const requestP = async (url: string, more?: More) => {
    const token: string | null = localStorage.getItem("token");

    if (!token) router.push("/auth");

    const response = await fetch(url, {
      method: more?.method,
      headers: {
        Authorization: `Token ${token}`,
        ...more?.headers,
      },
      body: more?.body,
    });

    if (more?.protected !== false && response.status === 401)
      router.push("/auth");

    return { ok: response.ok, headers: response.headers, response };
  };

  return { requestP };
};

export const useFetchJSON = () => {
  const { requestP } = usePFetch();

  const request = async (url: string, more: More) => {
    const { response } = await requestP(url, {
      method: more?.method,
      headers: {
        "Content-Type": "application/json",
        ...more?.headers,
      },
      body: JSON.stringify(more?.body),
    });

    const getJSON = async <T>() => (await response.json()) as T;

    return { ok: response.ok, headers: response.headers, getJSON, response };
  };

  return { request };
};
