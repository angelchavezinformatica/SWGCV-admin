<template>
  <main><slot /><Toaster class="Toaster" theme="dark" /></main>
</template>

<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<style lang="sass">
main
  @include flex-center-evenly()
  flex-direction: column
  width: 100%
  padding-top: 1.5rem
</style>
