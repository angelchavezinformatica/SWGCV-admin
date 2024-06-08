<template>
  <header class="Header" :style="{ width: closeButton ? '30px' : '180px' }">
    <button
      class="Header-closebutton"
      type="button"
      :title="`${closeButton ? 'Abrir' : 'Cerrar'} menú`"
      @click="() => setState(!closeButton)"
    >
      <Closed />
    </button>
    <nav class="Header-nav">
      <NuxtLink v-for="nav in headerNav" :to="nav.href" :aria-label="nav.title">
        <component :is="nav.icon" />
        <span v-show="!closeButton">{{ nav.title }}</span>
      </NuxtLink>
    </nav>
  </header>
  <slot />
</template>

<script setup lang="ts">
// import Backup from "~/components/icon/backup.vue";
// import Client from "~/components/icon/client.vue";
import Closed from "~/components/icon/closed.vue";
import Inventory from "~/components/icon/inventory.vue";
// import ShoppingCart from "~/components/icon/shopping-cart.vue";
// import Supplier from "~/components/icon/supplier.vue";
// import Worker from "~/components/icon/worker.vue";

import { useLocalStorage } from "~/composables/localStorage";

const headerNav = [
  { title: "Inventario", icon: Inventory, href: "/inventory" },
  // { title: "Ventas", icon: ShoppingCart, href: "/sales" },
  // { title: "Clientes", icon: Client, href: "/clients" },
  // { title: "Proveedores", icon: Supplier, href: "/suppliers" },
  // { title: "Empleados", icon: Worker, href: "/workers" },
  // { title: "Backups", icon: Backup, href: "/backups" },
];

const { state: closeButton, setState } = useLocalStorage<boolean>(
  false,
  "closeNav"
);

const auth = await useAuth();

if (auth) {
  const inventory = useInventoryStore();
  await callOnce(inventory.fetch);
} else if (auth === false) {
  const router = useRouter();
  router.push("/auth");
}
</script>

<style scope lang="sass">
.Header
  @include flex--start()
  flex-direction: column
  position: fixed
  top: 0
  left: 0
  background-color: $accent-1
  height: calc( 100vh - 2rem )
  padding: 1rem
  gap: 2.5rem
  z-index: 10000
  transition: all 0.1s
  .Header-closebutton
    background-color: transparent
    border: none
    width: 30px
    height: 30px
    cursor: pointer
    svg
      fill: $color-1
  .Header-closebutton:active
    transform: scale(.9)
  .Header-nav
    @include flex-center-center()
    flex-direction: column
    width: 100%
    a
      @include flex-center-()
      width: 100%
      height: 40px
      text-decoration: none
      overflow: hidden
      svg
        width: 30px
        height: 30px
        fill: $color-1
      span
        color: $color-1
        margin-left: .7rem
        font-size: 1.2rem
</style>
