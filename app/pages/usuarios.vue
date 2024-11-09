<script setup lang="ts">
import { ModalNewUser } from '#components'

// TODO:Arrumar tipagem
// TODO:Organizar código
// Mocked data
const columns = [{
    key: 'id',
    label: 'ID'
}, {
    key: 'name',
    label: 'Nome do usuário',
    sortable: true
}, {
    key: 'title',
    label: 'Cargo',
    sortable: true
}, {
    key: 'email',
    label: 'Email',
    sortable: true
}, {
    key: 'status',
    label: 'Status'
}]
const people = [{
    id: 1,
    name: 'Rafael Reichert Alfaro',
    title: 'Desenvolvedor Front-end',
    email: 'rafael@alfaro.com.br',
    status: 'Ativo'
}, {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    status: 'Pendente'
}, {
    id: 3,
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    status: 'Ativo'
}, {
    id: 4,
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    status: 'Pendente'
}, {
    id: 5,
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    status: 'Inativo'
}, {
    id: 6,
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    status: 'Ativo'
}]

// Data
const selectedColumns = ref([...columns])
const selectedStatuses = ref<string[]>([])
const q = ref<string>('')

// Composables
const modal = useModal()

function openModal() {
    modal.open(ModalNewUser)
}

// Query
const filteredRows = computed(() => {
    if (!q.value && !selectedStatuses.value.length) {
        return people
    }

    return people.filter((person) => {
        const matchesQuery = !q.value || Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })

        const matchesStatus = !selectedStatuses.value.length || selectedStatuses.value.includes(person.status)

        return matchesQuery && matchesStatus
    })
})

// Methods
const defaultStatuses = people.reduce((acc, user) => {
    if (!acc.includes(user.status)) {
        acc.push(user.status)
    }

    return acc
}, [] as string[])
</script>

// TODO:Componentizar
<template>
    <div>
        <div class="flex items-center justify-between gap-2 min-h-[56px] px-4">
            <h2 class="text-xl font-bold">Listagem de usuários</h2>

            <div>
                <UButton label="Adicionar Usuário" @click="openModal()"/>
            </div>
        </div>

        <UDivider />

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

        <UTable :rows="filteredRows" :columns="selectedColumns"
            :empty-state="{ icon: 'i-heroicons-face-frown', label: 'Não encontramos nenhum dado.' }" />
    </div>
</template>