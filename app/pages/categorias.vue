<script setup>
import { CategorieCreate } from '#components';

// Imports

// Composables
const supabase = useSupabaseClient()
const toast = useToast()
const modal = useModal()

// Fetched data
const { data: categories, status } = await useAsyncData('categories', async () => {
    const { data, error } = await supabase.from('categories').select()

    if (error) {
        toast.add({ title: 'Desculpe, ocorreu um erro', description: `Tivemos um problema do nosso lado. [${error.code}]`, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })

        return []
    }

    return data
})
const openCreateModal = () => {
    modal.open(CategorieCreate)
}

// Data
const columns = [{
    key: 'hex_color',
}, {
    key: 'name',
    label: 'Nome da categoria',
    sortable: true
}, {
    key: 'description',
    label: 'Descrição',
    sortable: true
}, {
    key: 'created_at',
    label: 'Criado em',
    sortable: true
}]

// Data
const selectedColumns = ref([...columns])
const selectedStatuses = ref([])
const q = ref('')

// Query
const filteredRows = computed(() => {
    if (!q.value && !selectedStatuses.value.length) {
        return categories.value
    }

    return categories.value?.filter((person) => {
        const matchesQuery = !q.value || Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })

        const matchesStatus = !selectedStatuses.value.length || selectedStatuses.value.includes(person.status)

        return matchesQuery && matchesStatus
    })
})

// Methods
const defaultStatuses = categories.value?.reduce((acc, user) => {
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
            <h2 class="text-xl font-bold">Listagem de categorias</h2>

            <UButton label="Criar nova categoria" @click="openCreateModal" />
        </div>

        <UDivider />

        <!-- Filters -->
        <div class="flex items-center gap-2 min-h-[56px] px-4">
            <UInput v-model="q" placeholder="Filtrar catagoria..." class="" />

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
        <UTable :rows="filteredRows" :columns="selectedColumns" :loading="status === 'pending'"
            :empty-state="{ icon: 'i-heroicons-face-frown', label: 'Não encontramos nenhum dado.' }" />
    </div>
</template>