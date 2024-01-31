<script setup lang="ts">
import * as yup from 'yup';
import { ref, inject, Ref } from 'vue';
import { useForm } from 'vee-validate';
import { Icon } from '@iconify/vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import AuthDivider from '@/components/AuthDivider.vue';
import LoadableButton from '@/components/LoadableButton.vue';
import Google from '@/components/Google.svg';
import Facebook from '@/components/Facebook.svg';

const toast = useToast();
const isLogin = inject<Ref<boolean>>('isSignUp');
    const schema = yup.object({
    email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email Address is invalid').required('Email Address is required'),
    password: yup.string().required('Password is required')
});

const { defineField, errors, handleSubmit } = useForm({
    validationSchema: schema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit((values) => {
    toast.add({ severity: 'success', summary: 'Form Submitted', detail: JSON.stringify(values), life: 3000 });
});

function goToSignUp(e: Event){
   e.preventDefault();
   isLogin? isLogin.value=true: '';
}
const isLoading = ref(false), 
isPasswordVisible = ref(false);

function changeLoading(){
    isLoading.value = !isLoading.value;
}
</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center w-full h-full px-10">
        <Toast />
        <form class="form bg-white flex flex-col items-start justify-center gap-3 p-5 w-full rounded-lg" @submit.prevent="" action="/"
            method="post">
            <h3 class="text-xl">Login</h3>
            <!-- <InputText class="w-full border-2 rounded-3xl border-solid shadow-lg shadow-gray-200" type="text" name="username" placeholder="Username" /> -->
            <div class="signup-input w-full">
                <div class="p-input-icon-right w-full">
                    <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2" icon="ion:mail-outline" />
                    <InputText v-model="email" :class="{ 'invalid': errors.email }" v-bind="emailAttrs"
                        class="w-full border-2 py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200"
                        type="email" name="email" placeholder="Email Address" />
                </div>
                <small class="p-error">{{ errors.email }} </small>
            </div>
            <div class="signup-input w-full">
                <div class="p-input-icon-right w-full">
                    <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2"
                        :icon="isPasswordVisible ? 'ion:eye-off-outline' : 'ion:eye-outline'"
                        @click="isPasswordVisible = !isPasswordVisible" />
                    <InputText v-model="password" :class="{ 'invalid': errors.password }" v-bind="passwordAttrs"
                        class="w-full border-2 py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200"
                        :type="isPasswordVisible ? 'text' : 'password'" name="password" placeholder="Password" />
                </div>
                <small class="p-error">{{ errors.password }} </small>
            </div>
            <!-- <InputText class="w-full border-2 rounded-3xl border-solid shadow-lg shadow-gray-200" type="password" name="confirm-password" placeholder="Confirm Password" /> -->
            <LoadableButton @click="(e)=>{changeLoading();onSubmit(e)}" :load="isLoading" class="man-signup flex items-center justify-center max-h-12 w-full py-[12px] bg-pb hover:bg-slate-700 rounded-3xl text-white dark:text-white dark:hover:bg-pb dark:bg-black tracking-widest">
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

/* 
input {
    padding: 12px 5px;
}
input:focus {
    
}

button {
    
} */
</style>