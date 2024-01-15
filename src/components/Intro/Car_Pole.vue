<script setup lang="ts">
import Car from '@/components/Intro/Car.svg';
import Pole from '@/components/Intro/Pole.svg';
import { animate } from 'motion';
import { useSwiperSlide } from 'swiper/vue';
import { watch } from 'vue';
const slide = useSwiperSlide();
watch(slide, () => {
    if(slide.value.isActive){
        setTimeout(()=>{
            animate('.blue-car', { transform: 'translateX(0%) translateY(25%)' }, { duration: 1.75 }).commitStyles();
            animate('#Right_Tyre', { transform: 'rotateZ(360deg)'}, { duration: 1.75 }).commitStyles();
            animate('#Left_Tyre', { transform: 'rotateZ(360deg)' }, { duration: 1.75 }).commitStyles();
        }, 500)
    }
});
</script>

<template>
        <Pole class="pole" title="Parking Point" />
        <Car title="Blue car about to park" class="blue-car" />
</template>

<style scoped>
:deep(#Right_Tyre), :deep(#Left_Tyre){
    transform-box: fill-box;
    transform-origin: 50% 50%;
}
.blue-car {
    transform: translateX(300px) translateY(25%);
}

svg {
    position: absolute;
    max-width: 350px;
}
.pole {
    transform: translateX(-20%);
    height: 200px;
}
</style>