<script setup>
// Imports
import * as Yup from 'yup'
import { useAuth } from '~/composables/api/useAuth';

// Emits
defineEmits(['changeTo'])

// Hooks
onMounted(() => {
    const login = localStorage.getItem('e-tech');
    const password = localStorage.getItem('p-tech');

    if (login && password) {
        rememberMe.value = true;

        state.login = login;
        state.password = password;
    }
})

// Composables
const toast = useToast()
const { login } = useAuth()

// Refs
const state = reactive({
    login: '',
    password: ''
})
const form = ref()
const loading = ref(false)
const rememberMe = ref(false);

// Schema
const schema = Yup.object({
    login: Yup.string().email('Email inválido').required('Obrigatório'),
    password: Yup.string().required('Obrigatório'),
})

// Methods
async function onSubmit(event) {
    loading.value = true

    const { error } = await login(event.data)

    if (error) {
        if (error.status == 401) form.value.setErrors([{ path: 'email', message: 'Email ou senha incorretos' }])
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
        localStorage.setItem('e-tech', state.login);
        localStorage.setItem('p-tech', state.password);
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
            <UForm ref="form" id="login-form" :schema="schema" :state="state" class="space-y-4"
                :validate-on="['submit']" @submit="onSubmit">
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.login" />
                </UFormGroup>

                <UFormGroup label="Senha" name="password">
                    <UInput v-model="state.password" type="password" />
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