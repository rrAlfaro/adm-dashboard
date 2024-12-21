<script setup>
// Imports
import { object, string } from 'yup'

// Props & emits
defineEmits(['close'])

// Composables
const toast = useToast()
const supabase = useSupabaseClient()

// Schema
const schema = object({
    name: string().required('Obrigatório'),
    description: string(),
    hex_color: string(),
})

// Refs
const form = ref({})
const loading = ref(false)

// Data
const colors = [
    '#4CAF50',
    '#81C784',
    '#FFCC80',
    '#FFEB3B',
    '#D84315',
    '#FF5722',
    '#FFC107',
    '#FFFFFF',
    '#03A9F4',
    '#F48FB1',
    '#FFAB91',
    '#9E9E9E',
    '#66BB6A',
    '#FF7043',
    '#FFA726',
    '#FFD54F'
]

// Methods
const onSubmit = async ($event) => {
    const { error } = await supabase.from('categories').insert($event.data)

    if (error) toast.add({ title: 'Desculpe, ocorreu um erro', description: `Tivemos algum problema do nosso lado, tente novamente mais tarde. [${error.code}]`, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
    else {
        toast.add({ title: 'Categoria criada com sucesso', description: 'Agora vocês pode adicionar produtos', color: 'green', icon: 'i-heroicons-check-circle-20-solid' })
        $emit('close')
    }
}
</script>

<template>
    <UModal>
        <UCard>
            <template #header>
                <p class="font-semibold text-xl">Criar nova categoria</p>
            </template>

            <template #default>
                <UForm id="create-categorie-form" ref="form" :schema="schema" :state="form"
                    class="grid grid-cols-6 gap-x-2 gap-y-4 items-start" @submit="onSubmit">
                    <UFormGroup label="Nome" name="name" required class="col-span-6">
                        <UInput v-model="form.name" />
                    </UFormGroup>

                    <UFormGroup label="Descrição" name="description" class="col-span-6">
                        <UTextarea v-model="form.description" />
                    </UFormGroup>
                </UForm>
            </template>

            <template #footer>
                <div class="flex items-center justify-end gap-4">
                    <UButton label="Cancelar" variant="soft" @click="$emit('close')" />

                    <UButton label="Criar" type="submit" form="create-categorie-form" :loading="loading" />
                </div>
            </template>
        </UCard>
    </UModal>
</template>