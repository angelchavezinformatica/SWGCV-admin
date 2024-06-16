<template>
  <section>
    <ProviderNav :notFound="current?.name" />
    <ProviderForm
      :id="current?.id"
      :name="current?.name"
      :phoneNumber="current?.phone_number"
    />
  </section>
</template>

<script setup lang="ts">
const { allProviders } = useProviderStore();
const route = useRoute();
const router = useRouter();

const current = allProviders.find(
  (provider) => provider.id === parseInt(route.params.id.toString())
);

onMounted(() => {
  if (!current) router.push("/provider");
});
</script>
