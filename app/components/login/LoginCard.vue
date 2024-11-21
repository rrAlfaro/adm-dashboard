<script setup>
// Imports
import * as Yup from 'yup'

// Emits
defineEmits(['changeTo'])

// Hooks
onMounted(() => {
    const email = localStorage.getItem('e-tech');
    const password = localStorage.getItem('p-tech');

    if (email && password) {
        rememberMe.value = true;

        form.value.email = email;
        form.value.password = password;
    }
})

// Composables
const toast = useToast()
const supabase = useSupabaseClient()

// Refs
const form = ref({})
const loading = ref(false)
const rememberMe = ref(false);

// Schema
const schema = Yup.object({
    email: Yup.string().email('Email inválido').required('Obrigatório'),
    password: Yup.string().required('Obrigatório'),
})

// Methods
async function onSubmit(event) {
    loading.value = true

    const { error } = await supabase.auth.signInWithPassword(event.data)

    if (error) {
        if (error.code === 'invalid_credentials') form.value.setErrors([{ path: 'email', message: 'Email ou senha incorretos' }])
        else toast.add({ title: 'Desculpe, ocorreu um erro', description: 'Tivemos algum problema do nosso lado, tente novamente mais tarde', color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
    } else {
        setRememberMe()
        toast.add({ title: 'Bem vindo!', color: 'green', icon: 'i-heroicons-check-circle-20-solid', timeout: 3000 })
        navigateTo({ path: '/' })
    }

    loading.value = false
}

function setRememberMe() {
    if (rememberMe.value) {
        localStorage.setItem('e-tech', form.value?.email);
        localStorage.setItem('p-tech', form.value?.password);
    } else {
        localStorage.removeItem('e-tech');
        localStorage.removeItem('p-tech');
    }
}
</script>

<template>
    <UCard class="max-w-sm mx-auto">
        <!-- TODO: Componentizar -->
        <template #header>
            <p class="font-semibold text-xl">Fazer login</p>

            <!-- <p class="text-sm text-gray-500">Entre e divirta-se. Você poderá criar, editar, excluir e visualizar
                informações livremente.</p> -->
        </template>

        <template #default>
            <UForm ref="form" id="login-form" :schema="schema" :state="form" class="space-y-4" :validate-on="['submit']"
                @submit="onSubmit">
                <UFormGroup label="Email" name="email">
                    <UInput v-model="form.email" />
                </UFormGroup>

                <UFormGroup label="Senha" name="password">
                    <UInput v-model="form.password" type="password" />
                </UFormGroup>
            </UForm>
        </template>

        <template #footer>
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-2 sm:mb-4">
                <UCheckbox v-model="rememberMe" name="remember" label="Lembrar de mim" />

                <!-- TODO: Recuperar senha -->
                <UButton variant="link" :to="null"
                    @click="toast.add({ title: 'Funcionalidade em desenvolvimento', color: 'yellow', icon: 'i-heroicons-exclamation-triangle' })">
                    Esqueci minha senha
                </UButton>
            </div>

            <UDivider class="sm:hidden my-2" />

            <div class="flex flex-col sm:flex-row items-center justify-between gap-y-2">
                <UButton label="Voltar" :loading="loading" variant="soft" @click="$emit('changeTo', 'choose')" />

                <UButton label="Acessar" type="submit" form="login-form" :loading="loading"
                    class="w-full sm:w-fit justify-center" />
            </div>
        </template>
    </UCard>
</template>