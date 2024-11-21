<script setup>
import { ModalNewUser } from '#components'

// TODO:Arrumar tipagem
// TODO:Organizar código
// Mocked data
const columns = [{
    key: 'id',
    label: 'ID'
}, {
    key: 'amount',
    label: 'Valor',
    sortable: true
}, {
    key: 'type',
    label: 'Tipo',
    sortable: true
}, {
    key: 'description',
    label: 'Descrição',
    sortable: true
}, {
    key: 'status',
    label: 'Status'
}]
// const transactions = [{
//     id: 1,
//     name: 'Rafael Reichert Alfaro',
//     title: 'Desenvolvedor Front-end',
//     email: 'rafael@alfaro.com.br',
//     status: 'Ativo'
// }, {
//     id: 2,
//     name: 'Courtney Henry',
//     title: 'Designer',
//     email: 'courtney.henry@example.com',
//     status: 'Pendente'
// }, {
//     id: 3,
//     name: 'Tom Cook',
//     title: 'Director of Product',
//     email: 'tom.cook@example.com',
//     status: 'Ativo'
// }, {
//     id: 4,
//     name: 'Whitney Francis',
//     title: 'Copywriter',
//     email: 'whitney.francis@example.com',
//     status: 'Pendente'
// }, {
//     id: 5,
//     name: 'Leonard Krasner',
//     title: 'Senior Designer',
//     email: 'leonard.krasner@example.com',
//     status: 'Inativo'
// }, {
//     id: 6,
//     name: 'Floyd Miles',
//     title: 'Principal Designer',
//     email: 'floyd.miles@example.com',
//     status: 'Ativo'
// }]

// Data

const supabase = useSupabaseClient()
const { data: users, error } = await useAsyncData('users', async () => {
    const { data, error } = await supabase
        .from('wallets')
        .select(`*`)


    if (error) {
        console.error('Erro ao buscar dados:', error)
        return []
    }

    return data
})

// const { data: users, error } = await useAsyncData('users', async () => {
//     const { data, error } = await supabase
//         .from('users')
//         .select('*')

//     if (error) return []

//     return data
// })
console.log(users.value, error.value)

// const { data: transactions, status } = await useAsyncData('transactions', async () => {
//     const { data, error } = await supabase
//         .from('transactions')
//         .select()

//     if (error) return []

//     return data
// })

// console.log(transactions.value)

const selectedColumns = ref([...columns])
const selectedStatuses = ref([])
const q = ref('')

// Composables
const modal = useModal()

function openModal() {
    modal.open(ModalNewUser)
}

// Query
// const filteredRows = computed(() => {
//     if (!q.value && !selectedStatuses.value.length) {
//         return transactions.value
//     }

//     return transactions.value.filter((person) => {
//         const matchesQuery = !q.value || Object.values(person).some((value) => {
//             return String(value).toLowerCase().includes(q.value.toLowerCase())
//         })

//         const matchesStatus = !selectedStatuses.value.length || selectedStatuses.value.includes(person.status)

//         return matchesQuery && matchesStatus
//     })
// })

// Methods
// const defaultStatuses = transactions.value.reduce((acc, transaction) => {
//     if (!acc.includes(transaction.status)) {
//         acc.push(transaction.status)
//     }
//     return acc
// })
</script>

// TODO:Componentizar
<template>
    <div>
        <div class="flex items-center justify-between gap-2 min-h-[56px] px-4">
            <h2 class="text-xl font-bold">Listagem de usuários</h2>

            <div>
                <UButton label="Adicionar Usuário" @click="openModal()" />
            </div>
        </div>

        <UDivider />


    </div>
</template>