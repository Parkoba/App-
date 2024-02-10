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
import SignUpInput from '@/components/SignUpInput.vue';
import LoadableButton from '@/components/LoadableButton.vue';
import Google from '@/components/Google.svg';
import Facebook from '@/components/Facebook.svg';
import { preloadAsyncComponent } from '@/utils';

const toast = useToast();
const isSignUp = inject<Ref<boolean>>('isSignUp');
const schema = yup.object({
    email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email Address is invalid').required('Email Address is required'),
    password: yup.string().required('Password is required')
});

const { defineField, errors, handleSubmit } = useForm<{
    email: string,
    password: string
}>({
    validationSchema: schema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit((values) => {
    toast.add({ severity: 'success', summary: 'Form Submitted', detail: JSON.stringify(values), life: 3000 });
});

const isLoading = ref(false),
    isPasswordVisible = ref(false);

</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center w-full h-full px-10">
        <Toast />
        <form class="form bg-white gap-3 p-5 w-full rounded-lg" @submit.prevent=""
            action="/" method="post">
            <h3 class="text-xl">Login</h3>
            <!-- <InputText class="w-full border-2 rounded-3xl border-solid shadow-lg shadow-gray-200" type="text" name="username" placeholder="Username" /> -->
            <SignUpInput v-model="email" placeholder="Email Address" type="email" icon="ion:mail-outline"
                :bindAttrs="emailAttrs" :invalid="errors.email" />
            <SignUpInput v-model="password" placeholder="Password" :type="isPasswordVisible ? 'text' : 'password'"
                :icon="isPasswordVisible ? 'ion:eye-off-outline' : 'ion:eye-outline'"
                :iconClick="() => { isPasswordVisible = !isPasswordVisible }" :bindAttrs="passwordAttrs"
                :invalid="errors.password" />
            <!-- <InputText class="w-full border-2 rounded-3xl border-solid shadow-lg shadow-gray-200" type="password" name="confirm-password" placeholder="Confirm Password" /> -->
            <LoadableButton @click="(e) => { onSubmit(e) }" :load="isLoading"
                class="man-signup flex items-center justify-center mt-5 max-h-12 w-full py-[12px] bg-pb hover:bg-slate-700 rounded-3xl text-white dark:text-white dark:hover:bg-pb dark:bg-black tracking-widest">
                Next
            </LoadableButton>
            <AuthDivider text="OR" />
            <div class="flex gap-2.5 py-2.5 w-full">
                <Button
                    class="flex-auto flex w-20 outline-none justify-center hover:bg-gray-200 gap-2.5 px-2.5 py-2.5 border-2 border-gray-400">
                    <Google class="h-8 w-8" />
                    <!-- Login with Google -->
                </Button>
                <Button
                    class="flex-auto flex w-20 outline-none justify-center hover:bg-gray-200 gap-2.5 px-2.5 py-2.5 border-2 border-gray-400">
                    <Facebook class="h-8 w-8" />
                    <!-- Login with Facebook -->
                </Button>
            </div>
            <div class="mt-2.5 text-center text-sm w-full">Don&apos;t have an account? <a href="#" @click.prevent="isSignUp=true"
                    class="text-pb hover:underline">Register now</a></div>
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
    
} */</style>