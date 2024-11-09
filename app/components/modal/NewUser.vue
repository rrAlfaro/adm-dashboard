<script setup lang="ts">
const email = useField('email', (value: string) => {
    if (!value) return 'Campo obrigatório'

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(String(value).toLowerCase())) {
        return 'Email inválido'
    }

    return true
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

            <!-- <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit"> -->
            <UFormGroup label="Email" name="email">
                <UInput v-model="email" />
            </UFormGroup>

            <UFormGroup label="Senha" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormGroup>
            <!-- </UForm> -->
            <template #footer>
                <div class="flex justify-end gap-2">
                    <UButton label="Cancelar" color="gray" @click="onSubmit" />

                    <UButton label="Salvar" />
                </div>
            </template>
        </UCard>
    </UModal>
</template>
