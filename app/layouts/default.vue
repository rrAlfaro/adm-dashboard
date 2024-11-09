<script setup lang="ts">
import LogoIcon from '@/assets/svg/logo-icon.svg'
import LogoName from '@/assets/svg/logo-name.svg'

const links = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/'
    }, {
        label: 'Usuários',
        icon: 'i-heroicons-users',
        to: '/usuarios'
    }, {
        label: 'Command Palette',
        icon: 'i-heroicons-command-line',
        to: '/comm'
    }]
</script>

<template>
    <div class="flex-shrink fixed inset-0 flex overflow-hidden">
        <header class="hidden lg:block w-[270px]">
            <div class="flex items-center min-h-[56px]">
                <div class="flex items-end gap-2 px-4">
                    <LogoIcon class="h-6 text-default-500" color="primary" :fontControlled="false" />
                    <LogoName class="h-4" :fontControlled="false" />
                </div>
            </div>

            <UDivider />

            <UVerticalNavigation :links="links" class="px-4 py-2" />
        </header>

        <UDivider orientation="vertical" />

        <main class="flex-1">
            <!-- TODO:Componentizar NavHeader -->
            <!-- TODO:Composable de troca de header -->
            <div class="flex items-center justify-between min-h-[56px] px-4">
                <h1 class="font-semibold text-default-500">Usuários</h1>

                <div>
                    <UButton color="gray" variant="ghost" class=" h-10 w-10">
                        <UIcon name="i-heroicons-magnifying-glass" size="24" />
                    </UButton>

                    <ButtonColorMode />
                </div>
            </div>

            <UDivider />

            <slot />
        </main>
    </div>
</template>
