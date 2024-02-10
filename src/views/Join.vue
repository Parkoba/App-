<script setup lang="ts">
import { computed, defineAsyncComponent, provide, ref } from 'vue';
import type { Component } from 'vue';
import { App } from '@capacitor/app';
// import SignUpForm from '@/components/SignUpForm.vue';
// import LoginForm from '@/components/LoginForm.vue';
import { IonPage, onIonViewDidLeave } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { preloadAsyncComponent, useLazyComponent } from '@/utils';

const router = useRouter();
const loginQuery = !(router.currentRoute.value.query.login==="true")
// let i = 0;
// let timeout: number;

// const router = useRouter();
// TODO: Observe this Event Listener
// App.addListener('backButton', closeAppOnBack);

const { comp: LoginForm } = useLazyComponent(() => import('@/components/LoginForm.vue'), null), 
      { comp: SignUpForm } = useLazyComponent(() => import('@/components/SignUpForm.vue'), null);
const isSignUp = ref<boolean>(loginQuery && true)
provide('isSignUp', isSignUp);

// const isFormLoading = computed(() => isSignUp.value? !isSignUpLoaded.value: !isLoaded.value);
</script>
        
<template>
    <IonPage>
        <div class="form-container h-full w-full">
            <Transition name="fade" mode="out-in">
                <component :is="isSignUp ? SignUpForm: LoginForm" />
            </Transition>
        </div>
    </IonPage>
</template>


<style scoped>
:deep(.form) {
    max-width: 400px;
    min-width: 320px;
    min-height: 275px;
    box-shadow: 2px 5px 10px 0px var(--parkoba-shadow-color);
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