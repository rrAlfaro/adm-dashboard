<script setup>
// Emits
defineEmits(['changeTo'])

// Imports
import * as Yup from 'yup'

// Composables
const toast = useToast()
const supabase = useSupabaseClient()

// Refs
const form = ref({})
const loading = ref(false)

// Schema
const schema = Yup.object({
    email: Yup.string().email('Email inválido').required('Obrigatório'),
    password: Yup.string().required('Obrigatório').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    password_confirmation: Yup.string().required('Obrigatório').oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
    name: Yup.string().required('Obrigatório'),
})

// Methods
async function onSubmit(event) {
    loading.value = true

    const { email, password, name, job_title } = event.data

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
                job_title: job_title
            }
        }
    })

    if (error) {
        if (error.code === 'user_already_exists') form.value.setErrors([{ path: 'email', message: 'Já existe uma conta com esse email' }])
        else toast.add({ title: 'Desculpe, ocorreu um erro', description: 'Tivemos algum problema do nosso lado, tente novamente mais tarde', color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
    } else {
        toast.add({ title: 'Bem vindo!', color: 'green', icon: 'i-heroicons-check-circle-20-solid', timeout: 3000 })
        navigateTo({ path: '/' })
    }

    loading.value = false
}
</script>

<template>
    <UCard class="max-w-sm mx-auto">
        <!-- TODO: Componentizar -->
        <template #header>
            <p class="font-semibold text-xl">Criar conta</p>

            <p class="text-sm text-gray-500">Não é necessário utilizar seus dados reais, todos os dados são resetados
                diariamente à
                meia-noite.</p>
        </template>

        <template #default>
            <UForm ref="form" id="create-account-form" :schema="schema" :state="form" class="space-y-4"
                @submit="onSubmit">
                <UFormGroup label="Email" name="email" required>
                    <UInput v-model="form.email" />
                </UFormGroup>

                <UFormGroup label="Nome" name="name" required>
                    <UInput v-model="form.name" />
                </UFormGroup>

                <UFormGroup label="Senha" name="password" required>
                    <UInput v-model="form.password" type="password" />
                </UFormGroup>

                <UFormGroup label="Confirmar Senha" name="password_confirmation" required>
                    <UInput v-model="form.password_confirmation" type="password" />
                </UFormGroup>
            </UForm>
        </template>

        <template #footer>
            <div class="flex flex-col sm:flex-row items-center justify-between gap-y-2">
                <UButton label="Voltar" :loading="loading" variant="soft" @click="$emit('changeTo', 'choose')" />

                <UButton label="Criar conta temporária" type="submit" form="create-account-form" :loading="loading"
                    class="w-full sm:w-fit justify-center" />
            </div>
        </template>
    </UCard>
</template>