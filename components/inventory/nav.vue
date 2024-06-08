<template>
  <Nav :tabs="tabs" title="Inventario" />
</template>

<script setup lang="ts">
const tabs = [
  { title: "Inventario", to: "" },
  // { title: "Agregar producto", to: "/add-product" },
  // { title: "Movimientos", to: "/history" },
  // { title: "Generar Reporte", to: "/report" },
];
</script>
