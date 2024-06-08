import { computed, ref, type ComputedRef, type Ref } from "vue";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";
import { LoginUrl } from "~/config/api";

export const useAuthPage = () => {
  const router = useRouter();

  const username: Ref<string> = ref("");
  const password: Ref<string> = ref("");
  const disabled: ComputedRef<boolean> = computed(
    () => !Boolean(username.value.length) || !Boolean(password.value.length)
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = {
      username: username.value,
      password: password.value,
    };

    username.value = "";
    password.value = "";

    toast.promise(
      fetch(LoginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
      {
        loading: "Cargando...",
        success: (data) => {
          data.json().then((json) => {
            localStorage.setItem("token", json.token);
          });
          router.push("/");
          return "Bienvenido Administrador!";
        },
        error: (_) => "Credenciales Incorrectas!",
      }
    );
  };

  return { disabled, handleSubmit, password, username };
};
