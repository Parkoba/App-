<script setup lang="ts">
import Button from 'primevue/button';
import Rolling from '@/components/Rolling.svg';
import { computed } from 'vue';
const props=defineProps<{
    load?: boolean
    size?: `${string}px`
}>();
const isLoading = computed(() => (props.load === undefined || props.load) && !0);
</script>
<template>
    <Button>
        <template v-if="!isLoading"><slot /></template>
        <template v-else>
            <Rolling stroke="white" :style="{height: size||'30px', width: size||'30px'}" />
        </template>
    </Button>
</template>


<style scoped>

</style>