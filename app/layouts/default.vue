<script setup>
// Imports
import LogoIcon from '@/assets/svg/logo-icon.svg'
import LogoName from '@/assets/svg/logo-name.svg'

// Composables
// const user = useSupabaseUser()
// const supabase = useSupabaseClient()
const { toast } = useToast()

// Data
const links = [{
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/'
}, {
    label: 'Usuários',
    icon: 'i-heroicons-users',
    to: '/usuarios'
}, {
    label: 'Produtos',
    icon: 'i-heroicons-shopping-cart',
    to: '/produtos'
}]
const dropDownItems = [
    [{
        // label: user.value?.user_metadata?.name,
        label: 'rafael',
        labelClass: 'text-xs cursor-pointer',
        slot: 'account',
        disabled: true
    }], [{
        label: 'Sair',
        labelClass: 'text-red-500',
        icon: 'i-heroicons-trash-20-solid',
        iconClass: 'text-red-500 dark:text-red-500',
        click: () => signOut()
    }]
]

// Methods
const signOut = async () => {
    // const { error } = await supabase.auth.signOut()

    // if (error) toast.add({ title: 'Desculpe, ocorreu um erro', description: 'Tivemos algum problema do nosso lado.', color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
    // else navigateTo({ path: '/login' })
}
const getCurrentRouteName = computed(() => {
    const routeName = useRoute().name

    if (routeName === 'index') return 'Dashboard'
    else return routeName.charAt(0).toUpperCase() + routeName.slice(1)
})
</script>

<template>
    <div class="fixed inset-0 flex overflow-hidden">
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
                <h1 class="font-semibold text-default-500">{{ getCurrentRouteName }}</h1>

                <div>
                    <UButton color="gray" variant="ghost" class=" h-10 w-10">
                        <UIcon name="i-heroicons-magnifying-glass" size="24" />
                    </UButton>

                    <ButtonColorMode />

                    <UDropdown :items="dropDownItems"
                        :ui="{ width: 'w-fit min-w-[200px]', item: { disabled: 'cursor-text select-text' } }">
                        <UButton color="gray" variant="ghost" class=" h-10 w-10">
                            <UIcon name="i-heroicons-user-circle" size="24" />
                        </UButton>

                        <template #account="{ item }">
                            <div class="text-left">
                                <p>Logado como:</p>
                                <p class="font-medium">
                                    {{ item.label }}
                                </p>
                            </div>
                        </template>
                    </UDropdown>
                </div>
            </div>

            <UDivider />

            <slot />
        </main>
    </div>
</template>
