<script setup lang="ts">
// import { IonButton } from '@ionic/vue';
import { useSwiper } from 'swiper/vue';
import { Ref, inject, toRef, watch } from 'vue';
import { useIonRouter } from '@ionic/vue';
const router = useIonRouter();
const activeIndex = inject('activeIndex') as Ref<number>

const swiperEl = useSwiper();
watch(activeIndex, ()=>{
    swiperEl.value.slideTo(activeIndex.value)
})
const isSlideEnd = toRef(swiperEl.value, 'isEnd');
</script>

<template>
    <div class="proceed-plane flex justify-end items-center px-5 mt-[30px]">
        <Transition name="intro-button" mode="out-in">
            <button class="bg-pb text-white text-bold text-16 px-4 py-6 tracking-wider rounded-md" v-if="isSlideEnd" @click="router.navigate('/join', 'forward', 'push')">Get Started</button>
            <button class="bg-pb text-white text-bold text-16 px-6 py-5 tracking-widest rounded-md" v-else @click="swiperEl.slideNext();">
                Next
            </button>
        </Transition>
    </div>
</template>


<style scoped>
/* .proceed-plane{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
    padding: 0 20px;
} */
/* .proceed-plane button{
    background-color: var(--parkoba-base-color);
    color: white;
    font-size: 16px;
    padding: 15px 15px;
    font-weight: 700;
    letter-spacing: 1px;
    border-radius: 5px;
} */
</style>