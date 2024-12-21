<script setup>
import { ProductCreate } from '#components';
import { useProduct } from '~/composables/api/useProduct';

// Imports

// Composables
const toast = useToast()
const modal = useModal()

// Fetched data
const { data: products, status, refresh } = await useLazyAsyncData('users', async () => {
    const { data, error } = await useProduct().getProducts()

    if (error) {
        toast.add({ title: 'Desculpe, ocorreu um erro', description: `Tivemos um problema do nosso lado. [${error.status}]`, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
        return []
    }

    return data?.data
})
console.log(products.value)
const openCreateModal = () => {
    modal.open(ProductCreate)
}

// Data
const columns = [{
    key: 'id',
    label: 'ID',
}, {
    key: 'name',
    label: 'Nome da categoria',
    sortable: true
}, {
    key: 'description',
    label: 'Descrição',
    sortable: true
}, {
    key: 'product_type_id',
    label: 'Tipo',
    sortable: true
}, {
    key: 'price',
    label: 'Preço',
    sortable: true
}]

// Data
const selectedColumns = ref([...columns])
const q = ref('')

// Query
const filteredRows = computed(() => {
    if (!q.value) {
        return products.value
    }

    return products.value?.filter((person) => {
        const matchesQuery = !q.value || Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })

        return matchesQuery
    })
})
</script>

<template>
    <div>
        <!-- TODO:Componentizar -->
        <!-- Header -->
        <div class="flex items-center justify-between gap-2 min-h-[56px] px-4">
            <h2 class="text-xl font-bold">Listagem de produtos</h2>

            <UButton label="Criar nova categoria" @click="openCreateModal" />
        </div>

        <UDivider />

        <!-- Filters -->
        <div class="flex items-center gap-2 min-h-[56px] px-4">
            <UInput v-model="q" placeholder="Filtrar produto..." class="" />

            <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Display" class="ml-auto">
                <template #label>
                    Colunas selecionadas
                </template>
            </USelectMenu>
        </div>

        <UDivider />

        <!-- Table -->
        <UTable :rows="filteredRows" :columns="selectedColumns" :loading="status !== 'success'"
            :empty-state="{ icon: 'i-heroicons-face-frown', label: 'Não encontramos nenhum dado.' }" />
    </div>
</template>