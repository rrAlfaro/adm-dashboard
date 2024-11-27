<script setup>
// Composables
const supabase = useSupabaseClient()
const toast = useToast()

// Fetched data
const { data: users, status } = await useAsyncData('profiles', async () => {
    const { data, error } = await supabase.from('profiles').select()

    if (error) {
        toast.add({ title: 'Desculpe, ocorreu um erro', description: `Tivemos um problema do nosso lado. [${error.code}]`, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })

        return []
    }

    return data
})
// Fetched data
const { data: user } = await useAsyncData('user', async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        toast.add({ title: 'Desculpe, ocorreu um erro', description: `Tivemos um problema do nosso lado. [${error.code}]`, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
        return []
    }

    const { user_metadata } = data.user
    return user_metadata
})

// TODO:Arrumar tipagem
// TODO:Organizar código
// Mocked data
const columns = [{
    key: 'name',
    label: 'Nome do usuário',
    sortable: true
}, {
    key: 'job_title',
    label: 'Cargo',
    sortable: true
}, {
    key: 'email',
    label: 'Email',
    sortable: true
}]

// Data
const selectedColumns = ref([...columns])
const selectedStatuses = ref([])
const q = ref('')

// Query
const filteredRows = computed(() => {
    if (!q.value && !selectedStatuses.value.length) {
        return users.value
    }

    return users.value?.filter((person) => {
        const matchesQuery = !q.value || Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })

        const matchesStatus = !selectedStatuses.value.length || selectedStatuses.value.includes(person.status)

        return matchesQuery && matchesStatus
    })
})

// Methods
const defaultStatuses = users.value?.reduce((acc, user) => {
    if (!acc.includes(user.status)) {
        acc.push(user.status)
    }

    return acc
}, [])
</script>

<template>
    <div>
        <!-- TODO:Componentizar -->
        <!-- Header -->
        <div class="flex items-center justify-between gap-2 min-h-[56px] px-4">
            <h2 class="text-xl font-bold">Listagem de usuários</h2>
        </div>

        <UDivider />

        <!-- Filters -->
        <div class="flex items-center gap-2 min-h-[56px] px-4">
            <UInput v-model="q" placeholder="Filtrar usuário..." class="" />

            <USelectMenu v-model="selectedStatuses" :options="defaultStatuses" multiple name="status"
                placeholder="Status" class="min-w-[120px]">
                <template v-if="selectedStatuses.length" #label>
                    {{ `${selectedStatuses.length} status` }}
                </template>
            </USelectMenu>

            <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Display" class="ml-auto">
                <template #label>
                    Colunas selecionadas
                </template>
            </USelectMenu>
        </div>

        <UDivider />

        <!-- Table -->
        <UTable :rows="filteredRows" :columns="selectedColumns"
            :empty-state="{ icon: 'i-heroicons-face-frown', label: 'Não encontramos nenhum dado.' }" />
    </div>
</template>