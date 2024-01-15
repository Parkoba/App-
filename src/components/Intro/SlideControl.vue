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
    <div class="proceed-plane">
        <Transition name="intro-button" mode="out-in">
            <button v-if="isSlideEnd" @click="router.navigate('/tabs/tab1', 'forward', 'push')">Get Started</button>
            <button v-else @click="swiperEl.slideNext();">
                Next
            </button>
        </Transition>
    </div>
</template>


<style scoped>
.intro-button-enter-active, .intro-button-leave-active {
     transition: 0.3s ease-in-out;
}
.intro-button-enter-from, .intro-button-leave-to {
     transform: translateY(20px);
     opacity: 0;
}
.proceed-plane{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
    padding: 0 20px;
}
.proceed-plane button{
    background-color: var(--parkoba-base-color);
    color: white;
    font-size: 16px;
    padding: 15px 15px;
    font-weight: 700;
    letter-spacing: 1px;
    border-radius: 5px;
}
</style>