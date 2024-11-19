<script setup>
// Meta
definePageMeta({ layout: false })

// Imports
import { object, string } from 'yup'
import LogoIcon from '@/assets/svg/logo-icon.svg'
import LogoName from '@/assets/svg/logo-name.svg'

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

// Refs
const form = ref({})
const loading = ref(false)
const rememberMe = ref(false);

// Schema
const schema = object({
    email: string().email('Email inválido').required('Obrigatório'),
    password: string()
        .required('Obrigatório')
})

// Methods
async function onSubmit(event) {
    loading.value = true

    const { success: loginSuccess, error: loginError } = await useAuth().login(event.data)

    if (loginError) {
        // TODO: Componentizar tratamento de erros;
        if (loginError.status == 422) {
            const formattedErrors = Object.entries(loginError.data.errors).flatMap(([field, messages]) =>
                messages.map(message => ({ path: field, message }))
            );

            form.value.setErrors(formattedErrors)
        } else {
            toast.add({ title: 'Erro ao logar', description: loginError.data?.message, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
        }
    }

    if (loginSuccess) {
        // TODO: Refatorar esta parte em função
        const { success: userSuccess, error: userError } = await useUser().getUser()

        if (userError) toast.add({ title: 'Erro ao buscar usuário', description: userError.data?.message, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })

        if (userSuccess) {
            setRememberMe()
            navigateTo('/')
        }
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
    <div class="fixed inset-0 flex items-center bg-gray-50">
        <UContainer :ui="{ constrained: 'max-w-md w-full' }">
            <UCard>
                <!-- TODO: Componentizar -->
                <template #header>
                    <div class="flex items-center min-h-[56px]">
                        <div class="flex items-end gap-2">
                            <LogoIcon class="h-8 text-default-500" color="primary" :fontControlled="false" />

                            <LogoName class="h-6" :fontControlled="false" />
                        </div>
                    </div>

                    <p class="text-sm text-gray-500 ">TECH desenvolvimento | Sistema administrativo </p>
                </template>

                <template #default>
                    <UForm ref="form" id="login-form" :schema="schema" :state="form" class="space-y-4"
                        :validate-on="['submit']" @submit="onSubmit">
                        <UFormGroup label="Email" name="email">
                            <UInput v-model="form.email" />
                        </UFormGroup>

                        <UFormGroup label="Password" name="password">
                            <UInput v-model="form.password" type="password" />
                        </UFormGroup>
                    </UForm>
                </template>

                <template #footer>
                    <div class="flex items-center justify-between mb-4">
                        <UCheckbox v-model="rememberMe" name="remember" label="Lembrar de mim" />

                        <!-- TODO: Recuperar senha -->
                        <UButton variant="link" :to="null"
                            @click="toast.add({ title: 'Funcionalidade em desenvolvimento', color: 'yellow', icon: 'i-heroicons-exclamation-triangle' })">
                            Esqueci minha senha
                        </UButton>
                    </div>

                    <UButton type="submit" form="login-form" :loading="loading" block>
                        Acessar
                    </UButton>
                </template>
            </UCard>
        </UContainer>
    </div>
</template>