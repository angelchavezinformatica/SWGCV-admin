import { ref, type Ref } from "vue";
import { AuthUrl } from "~/config/api";

export const useAuth = async () => {
  const token: string | null = localStorage.getItem("token");
  if (!token) return navigateTo("/auth");
  const auth: Ref<boolean | null> = ref(null);

  await callOnce(async () => {
    const response = await fetch(AuthUrl, {
      method: "GET",
      headers: { Authorization: `Token ${token}` },
    });
    auth.value = response.ok;
  });

  return auth.value;
};
