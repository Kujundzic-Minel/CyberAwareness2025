// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['@/assets/scss/main.scss'],

  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/foundations/variables" as *;',
        },
      },
    },
  },
});
