<template>
  <section>
    <h1>Bienvenido</h1>
    <form class="Form" novalidate @submit="handleSubmit">
      <div class="Form-input">
        <label for="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          v-model="username"
        />
      </div>
      <div class="Form-input">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <input type="submit" value="Iniciar Sesión" :disabled="disabled" />
    </form>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ layout: "non-protect" });
import { computed, ref, type ComputedRef, type Ref } from "vue";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";
import { LoginUrl } from "~/config/api";

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
</script>

<style scope lang="sass">
section
  @include flex-center-center()
  flex-direction: column
  width: 100%
  gap: 2rem
  h1
    color: $accent-1
    font-size: 2rem
  .Form
    @include flex-center-()
    flex-direction: column
    background-color: $accent-1
    padding: 1.5rem
    width: calc( 100% - 3rem )
    max-width: 350px
    gap: 1rem
    border-radius: 20px
    .Form-input
      @include flex--center()
      flex-direction: column
      width: 100%
      gap: .3rem
      label
        color: $color-1
        font-size: 1.2rem
      input
        padding: .3rem .8rem
        width: calc( 100% - 1rem )
        border: none
        outline: none
        border-radius: 20px
        font-size: 1.1rem
    input[type="submit"]
      background-color: $accent-2
      border: none
      width: 100%
      font-size: 1.2rem
      color: $color-1
      border-radius: 20px
      line-height: 2
      cursor: pointer
    input[type="submit"]:active
      transform: scale(.9)
    input[type="submit"]:disabled
      transform: scale(1)
      cursor: not-allowed
      opacity: 0.5
</style>
