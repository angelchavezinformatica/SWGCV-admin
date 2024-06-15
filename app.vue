<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster class="Toaster" theme="dark" />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({ htmlAttrs: { lang: "es" } });
import { Toaster } from "vue-sonner";
</script>
