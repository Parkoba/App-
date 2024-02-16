<script setup lang="ts">
import { useIonHead } from '@/utils';
import { IonPage } from '@ionic/vue';

useIonHead({
    title: 'Home Page',
})
</script>

<template>
    <IonPage>
        <div class="form-container h-full w-full flex items-center justify-center">
            <strong class="text-3xl text-white">Hello from Home View</strong>
        </div>
    </IonPage>
</template>

<style scoped></style>