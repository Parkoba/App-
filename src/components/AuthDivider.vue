<script setup lang="ts">
defineProps<{
    text?: string
}>()
</script>
<template>
    <div class="auth-divider relative bg-gray-400 h-0.5 w-full">
        <span class="font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black bg-white px-1.5" v-if="text">{{ text }}</span><span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3"></span>
    </div>
</template>


<style scoped></style>