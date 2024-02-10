<script setup lang="ts">
import {  } from 'vue';
import InputText from 'primevue/inputtext';
import { Icon } from '@iconify/vue';
import { SignUpInputProps } from '@/types';

const props = defineProps<SignUpInputProps & {
    disabled?: boolean
}>();
const inputValue=defineModel<string>();
</script>

<template>
    <div class="signup-input w-full">
        <div class="p-input-icon-right w-full">
            <Icon class="input-svg absolute w-7 h-7 top-1/2 -translate-y-1/2" :icon="icon" @click="iconClick" />
            <InputText v-model="inputValue" :class="{ 'invalid': invalid || false }" :disabled="disabled"
                class="w-full border-1 py-3 px-2.5 border-solid shadow-md focus:shadow-inner focus:shadow-gray-300 focus:border-b-2 shadow-gray-300 rounded-sm" :type="type"
                :placeholder="placeholder" v-bind="bindAttrs" />
        </div>
        <small class="p-error">{{ invalid }} </small>
    </div>
</template>


<style scoped></style>