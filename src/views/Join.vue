<script setup lang="ts">
import { defineAsyncComponent, provide, ref } from 'vue';
import type { Component } from 'vue';
import { App } from '@capacitor/app';
import FormLoading from '@/components/FormLoading.vue';
import SignUpForm from '@/components/SignUpForm.vue';
import { IonPage, onIonViewDidLeave } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { timeout } from '@/router';
import { useLazyComponent } from '@/utils';


// let i = 0;
// let timeout: number;

// const router = useRouter();
// TODO: Observe this Event Listener
// App.addListener('backButton', closeAppOnBack);

// onIonViewDidLeave(() => {
//     clearTimeout(timeout);
//     App.removeAllListeners();
// })

// function closeAppOnBack() {
//     i++;
//     timeout = setTimeout(() => {
//         if (i >= 2) {
//             if (timeout) clearTimeout(timeout);
//             i = 0;
//             return App.exitApp();
//         }
//     }, 500)
// }
// const isLoaded = ref<boolean>(false);
// const LoginForm = defineAsyncComponent({
//     loader: () => {
//         return new Promise<Component>((resolve, reject) => {
//             setTimeout(async () => {
//                 try {
//                     const { default: component } = await import('@/components/LoginForm.vue');
//                     isLoaded.value = true;
//                     resolve(component);
//                 } catch (error) {
//                     reject(error);
//                 }
//             }, 1000);
//         });
//     },
//     loadingComponent: FormLoading,
//     timeout: 100000,
// });
const { comp: LoginForm } = useLazyComponent(() => import('@/components/LoginForm.vue'));
const isSignUp = ref<boolean>(true);
provide('isSignUp', isSignUp);
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
    min-height: 400px;
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
    margin-bottom: 5px;
}

:deep(.man-signup) {
    margin-bottom: 20px;
}
:deep(svg) {
    cursor: pointer;
}
:deep(.p-error) {
    color: #dd1212
}
</style>