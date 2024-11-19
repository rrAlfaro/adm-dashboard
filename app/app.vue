<script setup lang="ts">
useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  titleTemplate: title => `Tech | ${title}`,
})

const title = 'Dashboard'
const description = 'Este é um sistema dashboard padrão. Produzido por Rafael Reichert Alfaro.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>
<template>
  <div>
    <NuxtLoadingIndicator color="text-default" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UModals />

    <UNotifications />
  </div>
</template>
