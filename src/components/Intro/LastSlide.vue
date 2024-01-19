<script setup lang="ts">
import { bounce } from '@/utils';
import { animate, timeline } from 'motion';
import { useSwiperSlide } from 'swiper/vue';
import { watch } from 'vue';
const slide = useSwiperSlide();
watch(slide, () => {
    if (slide.value.isActive) {
        setTimeout(() => {
            animate('#gold-coin', { opacity: '1' }, { duration: 1 }).commitStyles();
            animate('#gold-coin', { transform: 'translateY(0%)' }, { duration: 1.75, easing: bounce }).commitStyles();
        }, 500)
    }
});
</script>

<template>
    <img class="absolute" src="/Euro-Money.jpg" alt="Cash" />
    <img class="absolute" src="/gold-coin.jpg" id="gold-coin" alt="Gold Coin" />
</template>

<style scoped>
#gold-coin {
    transform: translateY(-200px);
    opacity: 0;
    right: -30px;
    bottom: 0px;
}
</style>