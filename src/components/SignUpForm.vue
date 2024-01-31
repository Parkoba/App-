<script setup lang="ts">
import { ref, inject, Ref, reactive, computed, watch, watchEffect, defineAsyncComponent } from 'vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import LoadableButton from '@/components/LoadableButton.vue';
// import PicturePicker from '@/components/PicturePicker.vue';
import AuthDivider from '@/components/AuthDivider.vue';
import Google from '@/components/Google.svg';
import Facebook from '@/components/Facebook.svg';
import { Icon } from '@iconify/vue';
const isSignUp = inject<Ref<boolean>>('isSignUp');
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useLazyComponent } from '@/utils';

const { comp: PicturePicker } = useLazyComponent(() => import('@/components/PicturePicker.vue'));
const toast = useToast();
const schema = yup.object({
    fullName: yup.string().required('Fullname is required'),
    email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email Address is invalid').required('Email Address is required'),
    password: yup.string().matches(/^(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: 'Must be at least 8 characters and must contain a number and special character'
    }).required('Password is required'),
    password2: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirmation Password is required'),
});

const { defineField, errors, handleSubmit } = useForm({
    validationSchema: schema,
});

// Password must be at least 8 characters and must contain a number and special character
const [fullName, fullNameAttrs] = defineField('fullName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [password2, password2Attrs] = defineField('password2');

function goToLogin(e: Event) {
    e.preventDefault();
    isSignUp ? isSignUp.value = false : '';
}
// function addToast() {
//     toast.add({ severity: 'error', summary: 'Success Message', detail: 'Message Content', life: 3000 });
// }
const isLoading = ref(false),
    isPassword1Visible = ref(false),
    isPassword2Visible = ref(false),
    isFormSubmitted=ref(false);
// password2 = ref(''),

// watch([password2, password], (a) => {
    //     passwordEqual.value = a[0] === a[1]
    // })
    // const form = reactive({
        //     username: '',
        //     email: '',
        //     password: '',
        //     password2: '',
//     buttonDisabled: true,
// });
function changeLoading() {
    isLoading.value = !isLoading.value;
}
const onSubmit = handleSubmit((values) => {
    toast.add({ severity: 'success', summary: 'Form Submitted', detail: JSON.stringify(values), life: 3000 });
    isFormSubmitted.value=true;
});

</script>

<template>
    <div class="flex gap-6 items-center justify-center w-full h-full px-10">
        <Toast position="top-center" />
        <form class="form bg-white px-5 py-2.5 w-full rounded-lg" @submit.prevent="" action="/" method="post" v-if="!isFormSubmitted">
            <h3 class="text-xl mb-2.5">Register</h3>
            <div class="signup-input">
                <div class=" p-input-icon-right w-full">
                    <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2" icon="ion:person-circle-outline" />
                    <InputText v-model="fullName" v-bind="fullNameAttrs" :class="{ 'invalid': errors.fullName }"
                        class="w-full border-2 py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200"
                        type="text" name="fullName" placeholder="Full Name" />
                </div>
                <small class="p-error">{{ errors.fullName }} </small>
            </div>
            <div class="signup-input">
                <div class="p-input-icon-right w-full">
                    <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2" icon="ion:mail-outline" />
                    <InputText v-model="email" :class="{ 'invalid': errors.email }" v-bind="emailAttrs"
                        class="w-full border-2 py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200"
                        type="email" name="email" placeholder="Email Address" />
                </div>
                <small class="p-error">{{ errors.email }} </small>
            </div>
            <div class="signup-input">
                <div class="p-input-icon-right w-full">
                    <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2"
                        :icon="isPassword1Visible ? 'ion:eye-off-outline' : 'ion:eye-outline'"
                        @click="isPassword1Visible = !isPassword1Visible" />
                    <InputText v-model="password" :class="{ 'invalid': errors.password }" v-bind="passwordAttrs"
                        class="w-full border-2 py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200"
                        :type="isPassword1Visible ? 'text' : 'password'" name="password" placeholder="Password" />
                </div>
                <small class="p-error">{{ errors.password }} </small>
            </div>
            <div class="signup-input">
                <div class="p-input-icon-right w-full">
                    <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2"
                        :icon="isPassword2Visible ? 'ion:eye-off-outline' : 'ion:eye-outline'"
                        @click="isPassword2Visible = !isPassword2Visible" />
                    <InputText v-model="password2" :class="{ 'invalid': errors.password2 }"
                        class="w-full border-2 py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200"
                        :type="isPassword2Visible ? 'text' : 'password'" name="password" placeholder="Password"
                        v-bind="password2Attrs" />
                </div>
                <small class="p-error">{{ errors.password2 }} </small>
            </div>
            <!-- <span class="p-input-icon-right w-full">
                <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2" :icon="isPassword1Visible ? 'ion:eye-off-outline' : 'ion:eye-outline'" @click="isPassword1Visible = !isPassword1Visible" />
                <InputText v-model="password" class="w-full border-2 rounded-3xl py-3 px-2.5 border-solid shadow-lg focus:shadow-inner shadow-gray-200" :type="isPassword1Visible ? 'text' : 'password'" placeholder="Confirm Password" />
            </span> -->
            <!-- Validity Checks Xtra -->
            <!-- <div>
                <div class="flex items-center gap-1.5 text-sm mb-1"><span class="v-check"></span> Must be atleast 8
                    characters</div>
                <div class="flex items-center gap-1.5 text-sm mb-1"><span class="v-check"></span> Must contain a number and
                    special character</div>
                <div class="flex items-center gap-1.5 text-sm mb-1"><span class="v-check"></span> Both passwords must match
                </div>
            </div> -->
            <LoadableButton @click="onSubmit" :load="isLoading"
                class="man-signup mt-5 disabled:bg-gray-500 flex items-center justify-center max-h-12 w-full py-[12px] bg-pb hover:bg-slate-700 rounded-3xl text-white dark:text-white dark:hover:bg-pb dark:bg-black tracking-widest">
                Next
            </LoadableButton>
            <AuthDivider text="OR" />
            <div class="flex gap-2.5 py-2.5 w-full">
                <Button
                    class="flex flex-auto w-20 outline-none justify-center hover:bg-gray-100 gap-2.5 px-2.5 py-2.5 border-2 border-gray-400">
                    <Google class="h-8 w-8" />
                    <!-- Signup with Google -->
                </Button>
                <Button
                    class="flex flex-auto w-20 outline-none justify-center hover:bg-gray-100 gap-2.5 px-2.5 py-1.5 border-2 border-gray-400">
                    <Facebook class="h-8 w-8" />
                    <!-- Signup with Facebook -->
                </Button>
            </div>
            <div class="mt-2.5 text-center text-sm w-full">Already have an account? <a href="#" @click="goToLogin"
                    class="text-pb hover:underline">Login</a></div>
        </form>
        <PicturePicker v-else />
    </div>
</template>


<style scoped>
/* .form {
    max-width: 400px;
    min-width: 300px;
    box-shadow: 2px 5px 10px 0px rgba(102, 102, 102, 0.336);
} */
/* .v-check {
    display: inline-flex;
    background-color: red;
    padding: 4px 6px;
    border: 1px solid black;
    border-radius: 50%;
}

.v-check::before {
    content: '';
    width: 4px;
    height: 9px;
    border-bottom: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: rotate(45deg) translate(-1px, -0.5px);
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