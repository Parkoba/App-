<script setup lang="ts">
import 'swiper/css';
import { IonPage, useBackButton, useIonRouter } from '@ionic/vue';
import Welcome from '@/components/Intro/Welcome.svg';
import CarPole from '@/components/Intro/Car_Pole.vue';
import EarthSlide from '@/components/Intro/Earth.vue';
import LastSlide from '@/components/Intro/LastSlide.vue';
import IntroSlideControl from '@/components/Intro/SlideControl.vue';
// import type { IntroPageSlide } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { } from '@ionic/vue'
import { useIonHead } from '@/utils';
import { App } from '@capacitor/app';
import { provide, ref } from 'vue';
const activeIndex = ref(0);
provide('activeIndex', activeIndex);
useIonHead({
    title: 'Welcome To Parkoba',
});

</script>
    
<template>
    <IonPage>
        <div class="h-full">
            <Swiper style="display: flex;" class="h-full flex-col justify-evenly" effect="coverflow" :speed="800" @slide-change="(e) => activeIndex = e.realIndex">
                <!-- <SwiperSlide v-for="(slide, i) in slides">
                    <SlideContent :alt="slide.alt" :index="i" :heading="slide.heading" :image="slide.image" />
                </SwiperSlide> -->
                <SwiperSlide>
                    <div class="slide_content">
                        <div class="graphics">
                            <Welcome title="Welcome Greeting" role="img" />
                        </div>
                        <strong class="heading">Welcome to Parkoba</strong>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="slide_content">
                        <div class="graphics">
                            <CarPole />
                        </div>
                        <strong class="heading">Easy Parking Just For You</strong>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="slide_content">
                        <div class="graphics">
                            <!-- <img src="/Earth_Location.png" class="rotate" alt="Picture of the Earth showing how close you are to the parking spot" /> -->
                            <EarthSlide />
                        </div>
                        <strong class="heading">Find A Spot Close To You</strong>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="slide_content">
                        <div class="graphics">
                            <img src="/images/Map.png" alt="Picture of a Map" />
                        </div>
                        <strong class="heading">Conveniently Situated</strong>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="slide_content">
                        <div class="graphics">
                            <LastSlide />
                        </div>
                        <strong class="heading">Affordable & Accessible</strong>
                    </div>
                </SwiperSlide>
                <div class="pagination flex justify-center items-center p-1.5 gap-3.5 mt-5">
                    <span v-for="(_, i)  in 5" :key="i" class="bullet" @click="activeIndex = i"
                        :class="{ active: i === activeIndex }"></span>
                </div>
                <IntroSlideControl />
            </Swiper>
        </div>
    </IonPage>
</template>


<style scoped>
.swiper :deep(.swiper-wrapper) {
    height: fit-content;
}

.slide_content {
    display: flex;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 30px 20px 0;
    border-radius: 10px;
    padding: 20px 20px;
    gap: 20px;
}

@media (min-width: 500px) {
    .swiper-slide {
        display: flex;
        justify-content: center;
    }

    .slide_content {
        width: 450px;
    }
}

.active {
    background-color: var(--parkoba-base-color) !important;
}

.bullet {
    background-color: white;
    border-radius: 50%;
    padding: 7px;
    box-shadow: var(--parkoba-shadow);
}

.heading {
    font-size: 1.4rem;
    color: var(--parkoba-text-color);
}

img.rotate {
    animation: spin 50s linear infinite;
}

:deep(.graphics) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
    width: 100%;
    max-width: 300px;
    margin-bottom: 30px;
    overflow-x: clip;
    overflow-y: hidden;
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
    .slide_content {
        background-color: rgba(255, 255, 255, 0.6);
    }

}

@media (prefers-color-scheme: dark) {
    .slide_content {
        background-color: rgba(20, 19, 19, 0.6);
    }
}</style>