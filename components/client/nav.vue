<template>
  <Nav :tabs="tabs" prev="client" />
</template>

<script setup lang="ts">
const tabs = [{ title: "Clientes", to: "", name: "client" }];
</script>
