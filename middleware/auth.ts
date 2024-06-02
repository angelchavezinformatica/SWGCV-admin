import { AuthUrl } from "~/config/api";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from.fullPath === "/auth") return;
  const token: string | null = localStorage.getItem("token");

  if (!token) return navigateTo("/auth");

  const response = await fetch(AuthUrl, {
    method: "GET",
    headers: { Authorization: `Token ${token}` },
  });

  if (!response.ok) return navigateTo("/auth");
});
