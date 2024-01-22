<script setup lang="ts">
import LoadingDots from '@/components/LoadingDots.vue';
import Roller from '@/components/Rolling.svg';
</script>
<template #fallback>
    <div class="flex flex-col gap-6 items-center justify-center w-full h-full px-10">
        <div class="form bg-white flex flex-col items-center justify-center gap-6 p-5 w-full rounded-lg">
            <Roller class="loader-svg" />
            <!-- <LoadingDots /> -->
        </div>
    </div>
</template>

<style scoped>
</style>