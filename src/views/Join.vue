<script setup lang="ts">
import { defineAsyncComponent, provide, ref } from 'vue';
import type { Component } from 'vue';
import { App } from '@capacitor/app';
import FormLoading from '@/components/FormLoading.vue';
import SignUpForm from '@/components/SignUpForm.vue';
import { IonPage, onIonViewDidLeave } from '@ionic/vue';
import { useRouter } from 'vue-router';
let i = 0;
let timeout: number;

const router = useRouter();
// TODO: Observe this Event Listener
App.addListener('backButton', closeAppOnBack);

onIonViewDidLeave(() => {
    if (timeout) clearTimeout(timeout);
    App.removeAllListeners();
})

function closeAppOnBack() {
    
    i++;
    timeout = setTimeout(() => {
        if (i >= 2) {
            if (timeout) clearTimeout(timeout);
            i = 0;
            return App.exitApp();
        }
    }, 500)
}
const isLoaded = ref<boolean>(false);
const LoginForm = defineAsyncComponent({
    loader: () => {
        return new Promise<Component>((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { default: component } = await import('@/components/LoginForm.vue');
                    isLoaded.value = true;
                    resolve(component);
                } catch (error) {
                    reject(error);
                }
            }, 1000);
        });
    },
    loadingComponent: FormLoading,
    timeout: 100000,
});
const isSignUp = ref<boolean>(true);
provide('isSignUp', isSignUp);
</script>
        
<template>
    <IonPage>
        <div class="form-container h-full">
            <Transition name="form" mode="out-in">
                <component :is="isSignUp ? SignUpForm: LoginForm" />
            </Transition>
        </div>
    </IonPage>
</template>


<style scoped>
.form-enter-active,
.form-leave-active {
    transition: 0.2s ease-in-out;
}

.form-enter-from,
.form-leave-to {
    opacity: 0;
}

:deep(.form) {
    max-width: 400px;
    min-width: 310px;
    min-height: 500px;
    box-shadow: 2px 5px 10px 0px rgba(102, 102, 102, 0.336);
}

:deep(.loader-svg) {
    width: 150px;
    height: 150px;
}
</style>