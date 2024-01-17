<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import SignUpForm from '@/components/SignUpForm.vue';
</script>
        
<template>
    <IonPage>
        <div class="form-container">
            <SignUpForm />
        </div>
    </IonPage>
</template>


<style scoped>
.form-container {
    height: 100%;
}
</style>