<script setup lang="ts">
import { defineAsyncComponent, provide, ref } from 'vue';
import type { Component } from 'vue';
import { IonPage } from '@ionic/vue';
import LoadingDots from '@/components/LoadingDots.vue';
import FormLoading from '@/components/FormLoading.vue';
const LoginForm = defineAsyncComponent({
    loader: () => {
        return new Promise<Component>((resolve, reject) => {
            setTimeout(async () => {
                try{let res = await import('@/components/LoginForm.vue');
                let r = res.default || res; 
                resolve(r)}
                catch(e){reject(e)}
            }, 1000);
        })
    },
    loadingComponent: FormLoading,
    timeout: 3000,
});
import SignUpForm from '@/components/SignUpForm.vue';
const isSignUp = ref<boolean>(true);
provide('isSignUp', isSignUp);
</script>
        
<template>
    <IonPage>
        <div class="form-container h-full">
            <Transition mode="out-in">
                    <component :is="isSignUp ? SignUpForm: LoginForm" />
            </Transition>
        </div>
    </IonPage>
</template>


<style scoped>
.form-enter-active,
.form-leave-active {
    transition: 0.4s ease-in-out;
}

.form-enter-from,
.form-leave-to {
    opacity: 0;
    transform: translateY(30%) scaleY(0.5);
}
:deep(.form) {
    max-width: 400px;
    min-width: 300px;
    min-height: 500px;
    box-shadow: 2px 5px 10px 0px rgba(102, 102, 102, 0.336);
}
:deep(.loader-svg){
    width: 150px;
    height: 150px;
}
</style>