<template>
  <section>
    <h1>Bienvenido</h1>
    <form class="Form" novalidate @submit="handleSubmit">
      <div class="Form-input">
        <label for="email">Correo</label>
        <input type="email" name="email" id="email" v-model="email" />
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

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const disabled: ComputedRef<boolean> = computed(
  () => !Boolean(email.value.length) || !Boolean(password.value.length)
);

const handleSubmit = (e: any) => {
  e.preventDefault();

  console.log(email.value);
  console.log(password.value);
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
        padding: .3rem .5rem
        width: calc( 100% - 1rem )
        border: 0
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
