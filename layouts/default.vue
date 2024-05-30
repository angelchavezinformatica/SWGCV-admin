<template>
  <header>Header</header>
  <main><slot /><Toaster /></main>
</template>

<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<style scope lang="sass"></style>
