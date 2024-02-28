<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import pageNotFound from '@/components/pageNotFound.vue';
</script>

<template>
    <IonPage>
        <Suspense>
            <pageNotFound />
        </Suspense>
    </IonPage>
</template>

<style scoped></style>