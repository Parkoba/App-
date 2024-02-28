<script setup lang="ts">
import { ref, inject, Ref, reactive, provide, computed, useAttrs, onMounted, nextTick, onUnmounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Steps from 'primevue/steps';
import Toast from 'primevue/toast';
import Rolling from '@/components/Rolling.svg';
import LoadableButton from '@/components/LoadableButton.vue';
// import PicturePicker from '@/components/PicturePicker.vue';
import AuthDivider from '@/components/AuthDivider.vue';
import Google from '@/components/Google.svg';
import Facebook from '@/components/Facebook.svg';
import { Icon } from '@iconify/vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { formAnimation, useLazyComponent } from '@/utils';
import { SignUpDetails, YupSignUpDetails, toRef1 } from '@/types';
import type { MenuItem } from 'primevue/menuitem';
import SignUpInput from './SignUpInput.vue';
import { onIonViewWillLeave, useIonRouter, toastController, IonToast } from '@ionic/vue';
import { checkmark } from 'ionicons/icons';


const { comp: PicturePicker } = useLazyComponent(() => import('@/components/PicturePicker.vue'), null);

const toast = useToast();
const router = useIonRouter();
const schema = yup.object({
    fullName: yup.string().required('Fullname is required'),
    email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email Address is invalid').required('Email Address is required'),
    password: yup.string().matches(/^(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: 'Must be at least 8 characters and must contain a number and special character'
    }).required('Password is required'),
    password2: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirmation Password is required'),
    phoneNumber: yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Phone Number is invalid').required('Phone Number is required')
});

const { defineField, errors, handleSubmit, validateField } = useForm<YupSignUpDetails>({
    validationSchema: schema,
});


// Password must be at least 8 characters and must contain a number and special character
const [fullName, fullNameAttrs] = defineField('fullName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [password2, password2Attrs] = defineField('password2');
const [phoneNumber, phoneAttrs] = defineField('phoneNumber');

// function addToast() {
    //     toast.add({ severity: 'error', summary: 'Success Message', detail: 'Message Content', life: 3000 });
// }
const isLoading = ref(false),
    isPassword1Visible = ref(false),
    isPassword2Visible = ref(false),
    isFormSubmitted = ref(false),
    signUpForm = reactive<toRef1<SignUpDetails>>({
        fullName,
        email,
        password,
        profilePicture: null,
        phoneNumber
    }),
    otpKey = ref<string>(''),
    canSendOtp = ref(true),
    isOtpInvalid = ref(false),
    isOtpLoading = ref(false),
    isSendClicked = ref(false),
    steps: MenuItem[] = [
        { label: '1', },
        { label: '2' }
    ];
    let otpTimeLeft = ref('00:59');
    const activeStep = ref(0),
    is10SecsLess = computed(() => {
        let secondRem = parseInt(otpTimeLeft.value.split(':')[1]);
        return secondRem <= 10
    }),
    otpClickedTime = ref(0);
let otpTimer = 0;
provide('signUpForm', signUpForm)


const onSubmit = handleSubmit(async (values) => {
    if (isLoading.value) return;
    const obj = Array.from(Object.entries(values)).map(([key, value]) => (`${key}: ${value}`));
    toast.add({ severity: 'success', summary: 'Form Submitted', detail: obj.join('\n') });
    isFormSubmitted.value = true;
});

function goToLogin() {
    router.push('/login', formAnimation);
}

function setOtpTimer() {
    otpClickedTime.value = Date.now();
    otpTimer = setInterval(() => {
        let remainingSec = (60000 - (Date.now() - otpClickedTime.value)) / 1000;
        if (remainingSec < 0) {
            clearInterval(otpTimer);
            canSendOtp.value = true;
            otpTimeLeft.value = '00:59';
            return;
        }
        otpTimeLeft.value = `${('0' + Math.floor(remainingSec / 3600)).slice(-2)}:${('0' + Math.floor(remainingSec % 60)).slice(-2)}`;
    }, 1000);
}
async function goToNextStep() {
    const result = (await validateField('password')).valid &&
        (await validateField('password2')).valid &&
        (await validateField('fullName')).valid &&
        (await validateField('email')).valid;

    if (result) {
        activeStep.value = 1;
    }
}
async function sendOtp() {
    if (!(await validateField('phoneNumber')).valid) { return }
    let otpResponse: string | null;
    isOtpLoading.value = true;
    isSendClicked.value = true;
    otpResponse = await new Promise<string>((resolve) => {
        const result = Math.random().toString(36).substring(2, 6).toUpperCase();
        setTimeout(resolve, 3000, result);
    }).catch(() => null);
    if (!otpResponse) { toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to send OTP\nPlease try again', life: 3000 }); return; }
    toast.add({ severity: 'info', summary: 'OTP Sent', detail: otpResponse });
    await nextTick();
    isOtpLoading.value = false;
    canSendOtp.value = false;
    setOtpTimer();

}

onUnmounted(() => clearInterval(otpTimer));
onIonViewWillLeave(() => clearInterval(otpTimer));
</script>

<template>
    <div class="flex gap-6 items-center justify-center w-full h-full px-10">
        <form class="form bg-white px-3 py-2.5 w-full rounded-lg" @submit.prevent="" action="/" method="post"
            v-if="!isFormSubmitted">
            <div class="flex items-center justify-between mb-2.5">
                <h3 class="inline text-xl">Register</h3>
                <Steps v-model:activeStep="activeStep" :model="steps" class="custom-steps">
                    <template #item="{ item, active }">
                        <strong
                            :class="['select-none inline-flex items-center justify-center w-9 h-9 rounded-full', { 'bg-black text-white': active, 'text-black cursor-pointer': !active }]">
                            {{ item.label }}
                        </strong>
                    </template>
                </Steps>
            </div>
            <div class="w-full flex items-center justify-center gap-2.5 px-1 pt-1 overflow-clip">
                <Transition :name="activeStep === 0 ? 'step-1' : 'step-2'" mode="out-in">
                    <div v-if="activeStep === 0" class="w-full">
                        <SignUpInput v-model="signUpForm.fullName" placeholder="Full Name" type="text"
                            icon="ion:person-circle-outline" :bindAttrs="fullNameAttrs" :invalid="errors.fullName" />

                        <SignUpInput v-model="signUpForm.email" placeholder="Email Address" type="email"
                            icon="ion:mail-outline" :bindAttrs="emailAttrs" :invalid="errors.email" />

                        <SignUpInput v-model="signUpForm.password" placeholder="Password"
                            :type="isPassword1Visible ? 'text' : 'password'"
                            :icon="isPassword1Visible ? 'ion:eye-off-outline' : 'ion:eye-outline'"
                            :iconClick="() => { isPassword1Visible = !isPassword1Visible }" :bindAttrs="passwordAttrs"
                            :invalid="errors.password" />

                        <SignUpInput v-model="password2" placeholder="Confirm Password"
                            :type="isPassword2Visible ? 'text' : 'password'"
                            :icon="isPassword2Visible ? 'ion:eye-off-outline' : 'ion:eye-outline'"
                            :iconClick="() => { isPassword2Visible = !isPassword2Visible }" :bindAttrs="password2Attrs"
                            :invalid="errors.password2" />
                        <Button type="button" @click="goToNextStep"
                            class="man-signup mt-5 disabled:bg-gray-500 flex items-center justify-center max-h-12 w-full py-[12px] bg-pb-950 hover:bg-slate-700 rounded-3xl text-white dark:text-white dark:hover:bg-pb-950 dark:bg-black tracking-widest">
                            Next
                        </Button>
                        <AuthDivider text="OR" />
                        <div class="flex gap-2.5 py-2.5 w-full">
                            <Button
                                class="flex flex-auto w-20 outline-none justify-center hover:bg-gray-200 gap-2.5 px-2.5 py-2.5 border-2 border-gray-400">
                                <Google class="h-8 w-8" />
                                <!-- Signup with Google -->
                            </Button>
                            <Button
                                class="flex flex-auto w-20 outline-none justify-center hover:bg-gray-200 gap-2.5 px-2.5 py-1.5 border-2 border-gray-400">
                                <Facebook class="h-8 w-8" />
                                <!-- Signup with Facebook -->
                            </Button>
                        </div>
                        <div class="mt-2.5 text-center text-sm w-full">Already have an account? <a href="/login" @click.prevent="goToLogin" class="text-pb-950 hover:underline">Login</a></div>
                    </div>
                    <div v-else class="w-full">
                        <SignUpInput :disabled="isSendClicked" v-model="signUpForm.phoneNumber" placeholder="Mobile Number"
                            icon="ion:call-outline" type="tel" :bindAttrs="phoneAttrs" :invalid="errors.phoneNumber" />

                        <div class="signup-input">
                            <div class="p-input-icon-right w-full">
                                <Rolling v-if="isOtpLoading" stroke-width="4"
                                    class="absolute right-4 top-1/2 -translate-y-1/4" stroke="#0F3877"
                                    :style="{ height: '25px', width: '25px' }" />
                                <span href="#" class="text-sm absolute right-4 top-1/2"
                                    :class="{ 'text-red-600': is10SecsLess, 'text-pb-950': !is10SecsLess }"
                                    v-else-if="!canSendOtp">{{ otpTimeLeft }}</span>
                                <a href="#" class="text-pb-950 hover:underline text-sm absolute right-4 top-1/2"
                                    @click.prevent="sendOtp" v-else-if="canSendOtp && !isOtpLoading">Send</a>
                                <InputText v-model="otpKey" :class="{ 'invalid': isOtpInvalid }"
                                    class="w-full py-3 px-2.5 mt-2.5 border-b-2  border-solid border-gray-950 rounded-none"
                                    placeholder="Enter OTP" />
                            </div>
                            <small class="p-error">{{ isOtpInvalid ? 'Invalid OTP ' : '' }} </small>
                        </div>
                        <LoadableButton :disabled="otpKey.length === 0" type="button" @click="onSubmit" :load="isLoading"
                            class="man-signup mt-5 disabled:bg-gray-500 flex items-center justify-center max-h-12 w-full py-[12px] bg-pb-950 hover:bg-slate-700 rounded-3xl text-white dark:text-white dark:hover:bg-pb-950 dark:bg-black tracking-widest">
                            Submit
                        </LoadableButton>
                    </div>
                </Transition>
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

        </form>
        <PicturePicker v-else />
    </div>
</template>


<style scoped>
.custom-steps :deep(ol) {
    gap: 5px;
}

.step-1-enter-active,
.step-1-leave-active,
.step-2-enter-active,
.step-2-leave-active {
    transition: 0.3s ease-in-out;
}

.step-1-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.step-1-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.step-2-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.step-2-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

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
    
} */</style>