<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref, inject, Ref } from 'vue';
import AuthDivider from '@/components/AuthDivider.vue';
import LoadableButton from '@/components/LoadableButton.vue';
import Google from '@/components/Google.svg';
import Facebook from '@/components/Facebook.svg';
import { Icon } from '@iconify/vue';
const isLogin = inject<Ref<boolean>>('isSignUp')
function goToSignUp(e: Event){
   e.preventDefault();
   isLogin? isLogin.value=true: '';
}
const isLoading = ref(false), 
isPasswordVisible = ref(false);
const password = ref(''),
username=ref('')
function changeLoading(){
    isLoading.value = !isLoading.value;
}
</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center w-full h-full px-10">
        <form class="form bg-white flex flex-col items-start justify-center gap-6 p-5 w-full rounded-lg" @submit.prevent="" action="/"
            method="post">
            <div class="w-full flex justify-between items-center"><h3 class="text-xl">Login</h3><img src="/images/parkoba.png" width="50" height="50" alt="Parkoba Logo"></div>
            <!-- <InputText class="w-full border-2 rounded-3xl border-solid shadow-lg shadow-gray-200" type="text" name="username" placeholder="Username" /> -->
            <span class="p-input-icon-right w-full">
                <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2" icon="ion:person-circle-outline" />
                <InputText v-model="username" class="w-full border-2 rounded-3xl py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200" type="email" name="email" placeholder="Email Address" />
            </span>
            <span class="p-input-icon-right w-full">
                <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2" :icon="isPasswordVisible ? 'ion:eye-off-outline' : 'ion:eye-outline'" @click="isPasswordVisible = !isPasswordVisible" />
                <InputText v-model="password" class="w-full border-2 rounded-3xl py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200" :type="isPasswordVisible ? 'text' : 'password'" name="password" placeholder="Password" />
            </span>
            <!-- <InputText class="w-full border-2 rounded-3xl border-solid shadow-lg shadow-gray-200" type="password" name="confirm-password" placeholder="Confirm Password" /> -->
            <LoadableButton @click="changeLoading" :load="isLoading" class="flex items-center justify-center max-h-12 w-full py-[12px] bg-pb hover:bg-slate-700 rounded-3xl text-white dark:text-white dark:hover:bg-pb dark:bg-black tracking-widest">
                Next
            </LoadableButton>
            <AuthDivider text="OR" />
            <div class="flex gap-2.5 py-2.5 w-full">
                <Button class="flex-auto flex w-20 outline-none justify-center hover:bg-gray-200 gap-2.5 px-2.5 py-2.5 border-2 border-gray-400"><Google class="h-8 w-8" /> 
                    <!-- Login with Google -->
                </Button>
                <Button class="flex-auto flex w-20 outline-none justify-center hover:bg-gray-200 gap-2.5 px-2.5 py-2.5 border-2 border-gray-400"><Facebook class="h-8 w-8" /> 
                    <!-- Login with Facebook -->
                </Button>
            </div>
            <div class="mt-2.5 text-center text-sm w-full">Don&apos;t have an account? <a href="#" @click="goToSignUp" class="text-pb hover:underline">Register now</a></div>
        </form>
    </div>
</template>


<style scoped>
/* .form {
    max-width: 400px;
    min-width: 300px;
    box-shadow: 2px 5px 10px 0px rgba(102, 102, 102, 0.336);
} */

svg{
    z-index: 1;
    cursor: pointer;
}
input{outline: none;}
/* 
input {
    padding: 12px 5px;
}
input:focus {
    
}

button {
    
} */
</style>