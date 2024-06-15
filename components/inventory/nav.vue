<template>
  <Nav :tabs="tabs" prev="inventory" />
</template>

<script setup lang="ts">
const tabs = [
  { title: "Inventario", to: "", name: "inventory" },
  {
    title: "Agregar Producto",
    to: "/add-product",
    name: "inventory-add-product",
  },
  // { title: "Movimientos", to: "/history" },
  // { title: "Generar Reporte", to: "/report" },
];
</script>
