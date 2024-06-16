<template>
  <section>
    <ProviderNav />
    <div v-for="provider in allProviders" class="Providers">
      <p>{{ provider.name }} ({{ provider.phone_number }})</p>
      <NuxtLink
        :to="`/provider/update/${provider.id}`"
        :aria-label="`Editar proveedor ${provider.id}`"
      >
        <IconPencil />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: "Proveedores | Vivero La Huerta" });

const { allProviders } = useProviderStore();
</script>

<style scope lang="sass">
.Providers
  display: flex
  justify-content: space-between
  width: 100%
  max-width: 450px
  box-shadow: 0 0 5px $accent-1
  padding: .7rem 1.5rem .7rem
  border-radius: 30px
  a
    @include flex-center-center()
    width: 24px
    height: 24px
</style>
