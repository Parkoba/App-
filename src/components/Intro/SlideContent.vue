<script setup lang="ts">
import { IntroPageSlide } from '@/types';
import Welcome from '@/components/Intro/Welcome.svg';
import CarPole from '@/components/Intro/Car_Pole.vue';
import LastSlide from '@/components/Intro/LastSlide.vue';

const props = defineProps<IntroPageSlide & {
    index: number
}>();
</script>

<template>
    <div class="slide_content">
        <div class="graphics" v-if="index==0">
            <Welcome  :title="alt" />
        </div>
        <CarPole v-else-if="index==1" />
        <LastSlide v-else-if="index==4" />
        <div class="graphics" v-else>
            <img :src="image" :class="{ 'rotate': index == 2 }" :alt="heading" :title="alt" />
        </div>
        <strong class="heading">{{ heading }}</strong>
    </div>
</template>

<style scoped>
.heading{
    font-size: 1.4rem;
    color: var(--parkoba-text-color);
    margin-top: 20px;
    text-align: center;
}
.slide_content {
    display: flex;
    height: fit-content; 
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    padding: 20px 20px;
    gap: 20px;
}
img.rotate{
    animation: spin 5s linear infinite;
}
:deep(.graphics) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 30px;
    overflow-x: clip;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@media (prefers-color-scheme: light) {
    .slide_content{
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        margin-left: 20px;
        margin-right: 20px;
    }
    
}
@media (prefers-color-scheme: dark) {
    .slide_content{
        background-color: rgba(20, 19, 19, 0.6);
        border-radius: 10px;
        margin-left: 20px;
        margin-right: 20px;
    }
}
</style>