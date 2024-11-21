<script setup>
// Meta
definePageMeta({ layout: false })

// Imports
import LogoIcon from '@/assets/svg/logo-icon.svg'
import LogoName from '@/assets/svg/logo-name.svg'

// Refs
const control = ref('choose')

// Methods
const isStep = (step) => control.value === step
</script>

<template>
    <div class="fixed inset-0 flex items-center z-30">
        <UContainer :ui="{ constrained: 'w-full space-y-4' }">
            <div class="flex flex-col items-center justify-center gap-2">
                <div class="flex items-end gap-2">
                    <LogoIcon class="h-14 text-default-500" color="primary" :fontControlled="false" />

                    <LogoName class="h-10" :fontControlled="false" />
                </div>

                <h1 class="text text-gray-500 text-center">TECH Desenvolvimento - Sistema Administrativo</h1>

                <div class="flex items-center gap-2">
                    <h2 class="text-sm text-default-500 text-center">Portfolio - Rafael Reichert Alfaro</h2>

                    <ButtonColorMode />
                </div>
            </div>

            <LoginChooseCard v-if="isStep('choose')" @changeTo="control = $event" />

            <LoginCreateAccountCard v-if="isStep('create-account')" @changeTo="control = $event" />

            <LoginCard v-if="isStep('login')" @changeTo="control = $event" />
        </UContainer>
    </div>
</template>