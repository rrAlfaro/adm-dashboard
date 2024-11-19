<script setup>
import { object } from 'yup';

const validationSchema = object({
    name: string().required(),
    cpf: string().required(),
})

async function onSubmit() {
    // Do something with event.data
    console.log('submitted')
}
</script>

<template>
    <UModal>
        <UCard class="max-h-[90vh]">
            <template #header>
                <p class="font-semibold">Novo Usuário</p>

                <p class="text-sm text-gray-500">Adicione um usuário ao banco de dados</p>
            </template>

            <template #default>

            </template>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <UButton label="Cancelar" color="gray" @click="onSubmit" />

                    <UButton label="Salvar" />
                </div>
            </template>
        </UCard>
    </UModal>
</template>
