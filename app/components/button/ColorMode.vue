<script setup lang="ts">
const colorMode = useColorMode()
const toogleColorMode = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
    <ClientOnly>
        <UButton @click="toogleColorMode" color="yellow" variant="ghost" class=" h-10 w-10">
            <UIcon v-if="colorMode.preference === 'light'" name="i-heroicons-sun" size="24" />
            <UIcon v-else name="i-heroicons-moon" size="24" />
        </UButton>
    </ClientOnly>
</template>