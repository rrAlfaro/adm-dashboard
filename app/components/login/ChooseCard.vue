<script setup>
// Emits
defineEmits(['changeTo'])
</script>

<template>
    <UCard class="max-w-xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4">
            <!-- Botão 'Criar conta' -->
            <button type="button" @click="$emit('changeTo', 'create-account')"
                class="flex flex-col items-center justify-center px-6 py-4 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <p class="text-xl font-bold">Criar conta</p>

                <p class="text-xs text-center text-gray-500 mb-4">Para fins de demonstração, caso ainda não
                    tenha feito,
                    crie
                    um usuário
                    para acessar o sistema.</p>

                <UIcon name="i-heroicons-finger-print" size="64" class="text-default-500" />
            </button>

            <UDivider label="ou" orientation="vertical" class="hidden sm:flex w-fit" />
            <UDivider label="ou" class="sm:hidden" />

            <!-- Botão 'Fazer login' -->
            <button type="button" @click="$emit('changeTo', 'login')"
                class="flex flex-col items-center justify-center px-6 py-4 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <p class="text-xl font-bold">Fazer login</p>

                <p class="text-xs text-center text-gray-500 mb-4">Caso já tenha criado uma conta hoje.</p>

                <UIcon name="i-heroicons-arrow-left-end-on-rectangle" size="64" class="text-default-500" />
            </button>
        </div>
    </UCard>
</template>