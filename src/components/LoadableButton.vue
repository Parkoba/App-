<script setup lang="ts">
import Button from 'primevue/button';
import FormLoading from '@/components/FormLoading.vue';
const props=defineProps<{
    load?: boolean
}>();
const isLoading = props.load === undefined && !0;
</script>
<template>
    <Button>
        <template v-if="!isLoading"><slot /></template>
        <template v-else>
            <FormLoading />
        </template>
    </Button>
</template>


<style scoped></style>