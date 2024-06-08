<template>
  <main class="Main">
    <slot /><Toaster v-if="toaster" class="Toaster" theme="dark" />
  </main>
</template>

<script setup lang="ts">
interface Props {
  toaster?: boolean;
}
defineProps<Props>();

import { Toaster } from "vue-sonner";
</script>
