// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/sass/globals.sass"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/sass/_utils.sass" as *\n',
        },
      },
    },
  },
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@pinia/nuxt"],
});
