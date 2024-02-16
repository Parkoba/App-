<script setup lang="ts">
import SignUpForm from '@/components/SignUpForm.vue';
import { useIonHead } from '@/utils';
import { IonPage } from '@ionic/vue';
import Toast from 'primevue/toast';
useIonHead({
    title: 'Register | Parkoba',
});

</script>
<template>
    <IonPage>
        <div class="form-container h-full w-full">
            <!-- <Toast position="top-center" /> -->
            <SignUpForm />
        </div>
    </IonPage>
</template>


<style scoped>
.form-container {
    backdrop-filter: blur(10px);
}
:deep(.form) {
    max-width: 400px;
    min-width: 320px;
    min-height: 275px;
    box-shadow: 2px 5px 10px 0px var(--parkoba-shadow-color);
}

.form-container > :deep(div){
    background-position: 75% -300px;
    background-image: url('./images/car_park.jpg');
}

:deep(.loader-svg) {
    width: 150px;
    height: 150px;
}

:deep(input) {
    outline: none;
}

:deep(.invalid) {
    outline: 1px solid #dd1212 !important;
}

:deep(.signup-input) {
    margin-bottom: 7px;
    border-top: 0px;
}

:deep(.man-signup) {
    margin-bottom: 20px;
}
:deep(.p-error) {
    color: #dd1212
}
</style>