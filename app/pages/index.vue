<script setup>
import { useAuth } from '~/composables/api/useAuth';
import { useUser } from '~/composables/api/useUser';

const { login } = useAuth();

const form = {
    login: 'leda.pacocha@example.com',
    password: 'password'
}



// const { data, error } = await useUser().getUsers()


const { baseURL } = useRuntimeConfig().public

// const { data, error } = await $fetch(`${baseURL}/api/employees`, {
//     method: 'GET',
//     credentials: "include",
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${useCookie('token').value}`
//     }
// })
// console.log(data.value, error)

const onSubmit = async () => {
    await login(form)
}


</script>

<template>
    <div>
        <!-- <button type="button" @click="onSubmit()">fazer login</button> -->
        <!-- <div class="leading-8">
            <h3 class="font-semibold text-default-500">Usuários</h3>
            <h2 class="text-2xl font-bold">Listagem</h2>
            <p class="text-sm text-gray-500">Fully styled and customizable components for Nuxt.</p>
        </div> -->
    </div>
</template>
