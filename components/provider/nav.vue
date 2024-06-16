<template>
  <Nav :tabs="tabs" prev="provider" v-bind="$attrs" />
</template>

<script setup lang="ts">
const tabs = [
  { title: "Proveedores", to: "", name: "provider" },
  {
    title: "Agregar Proveedor",
    to: "/add-provider",
    name: "provider-add-provider",
  },
];
</script>
