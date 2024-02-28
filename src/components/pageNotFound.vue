<script setup lang="ts">
import { checkUserValid } from '@/utils';
import { IonButton } from '@ionic/vue';
import { ref } from 'vue';
const [{ value: hasDoneIntro }, { value: isUserValid }] = await checkUserValid();
const redirectText = ref("");
if (!hasDoneIntro) {
    redirectText.value = "Get Started"
} else if (hasDoneIntro && isUserValid !== "true") {
    redirectText.value = "Register Now"
}
</script>

<template>
        <div class="h-full flex flex-col items-center pt-12">
            <h1 class="text-black dark:text-white text-3xl">Hello Wrong Page</h1>
            <IonButton class="bg-pb-950 text-white shadow-sm shadow-pb-700">{{ redirectText }}</IonButton>
        </div>
</template>

<style scoped>

</style>