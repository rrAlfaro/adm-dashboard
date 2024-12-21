<script setup>
// Imports
import * as Yup from 'yup'
import { useUser } from '~/composables/api/useUser';

// Props & emits
defineEmits(['close', 'created'])

// Composables
const toast = useToast()
const { createUser } = useUser()

// Refs
const state = reactive({
    email: '',
    password: '',
    confirm_password: '',
    name: '',
})
const form = ref({})
const loading = ref(false)

// Schema
const schema = Yup.object({
    email: Yup.string().email('Email inválido').required('Obrigatório'),
    password: Yup.string().required('Obrigatório').min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirm_password: Yup.string().required('Obrigatório').oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
    name: Yup.string().required('Obrigatório'),
})

// Methods
const onSubmit = async (event) => {
    loading.value = true

    const { error } = await createUser(event.data)

    if (error) {
        if (error?.data?.errors?.email) form.value.setErrors([{ path: 'email', message: 'Já existe uma conta com esse email' }])
        else toast.add({ title: 'Desculpe, ocorreu um erro', description: 'Tivemos algum problema do nosso lado, tente novamente mais tarde', color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
    } else {
        toast.add({ title: 'Usuário criado com sucesso!', color: 'green', icon: 'i-heroicons-check-circle-20-solid', timeout: 3000 })
        emit('created')
    }

    loading.value = false
}
</script>

<template>
    <UModal>
        <UCard>
            <template #header>
                <p class="font-semibold text-xl">Criar novo usuário</p>
            </template>

            <template #default>
                <UForm ref="form" id="create-account-form" :schema="schema" :state="state"
                    class="gap-4 grid grid-cols-2" @submit="onSubmit">
                    <UFormGroup label="Email" name="email" required class="col-span-2">
                        <UInput v-model="state.email" />
                    </UFormGroup>

                    <UFormGroup label="Nome" name="name" required class="col-span-2">
                        <UInput v-model="state.name" />
                    </UFormGroup>

                    <UFormGroup label="Senha" name="password" required class="col-span-2 sm:col-span-1">
                        <UInput v-model="state.password" type="password" />
                    </UFormGroup>

                    <UFormGroup label="Confirmar Senha" name="confirm_password" required class="col-span-2 sm:col-span-1">
                        <UInput v-model="state.confirm_password" type="password" />
                    </UFormGroup>
                </UForm>
            </template>

            <template #footer>
                <div class="flex items-center justify-end gap-4">
                    <UButton label="Cancelar" variant="soft" @click="$emit('close')" />

                    <UButton label="Criar" type="submit" form="create-categorie-form" :loading="loading" />
                </div>
            </template>
        </UCard>
    </UModal>
</template>