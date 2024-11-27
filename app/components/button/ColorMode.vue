<script setup>
// Props
defineProps({
    color: {
        type: String,
        default: 'yellow'
    },
    variant: {
        type: String,
        default: 'ghost'
    }
})

// Composable
const colorMode = useColorMode()

// Methods
const toogleColorMode = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
    <ClientOnly>
        <UButton @click="toogleColorMode"  :variant="variant" class=" h-10 w-10">
            <UIcon v-if="colorMode.preference === 'light'" name="i-heroicons-sun" size="24" />
            <UIcon v-else name="i-heroicons-moon" size="24" />
        </UButton>
    </ClientOnly>
</template>