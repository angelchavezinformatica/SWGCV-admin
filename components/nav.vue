<template>
  <section class="Navigation">
    <nav class="Navigation-nav">
      <NuxtLink to="/">Inicio</NuxtLink>
      <NuxtLink v-for="tab in tabs" :to="`/inventory${tab.to}`">
        {{ tab.title }}
      </NuxtLink>
    </nav>
    <h1 class="Navigation-title">{{ title }}</h1>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  tabs: { to: string; title: string }[];
}
defineProps<Props>();
</script>

<style scope lang="sass">
.Navigation
  @include flex-center-()
  flex-direction: column
  gap: 1.5rem
  .Navigation-title
    color: $accent-2
    font-size: 2rem
  .Navigation-nav
    @include flex-center-()
    gap: 1rem
    a
      padding: .7rem 1rem
      border: 1px solid $accent-2
      border-radius: 10px
      box-shadow: 0 0 5px $accent-2, 0 0 5px $accent-2 inset
      color: $color-2
      text-decoration: none
    a.router-link-active
      display: none
</style>
