<script setup lang="ts">
import Steps from 'primevue/steps';
const items = [{}, {}, {}];
</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center w-full h-full px-10">
        <form class="form flex flex-col items-start justify-center gap-6 p-5 w-full" @submit.prevent="" action="/" method="post">
            <h3>Register</h3>
            <Steps class="w-full" :model="items" :readonly="false">
              
            </Steps>
            <input class="w-full px-2 py-3" type="text" name="username" placeholder="Username" />
            <input class="w-full px-2 py-3" type="email" name="email" placeholder="Email Address" />
            <input class="w-full px-2 py-3" type="password" name="password" placeholder="Password" />
            <input class="w-full px-2 py-3" type="password" name="email" placeholder="Confirm Password" />
            <button class="py-4 w-full text-white hover:bg-slate-100 hover:text-black transition font-bold">Next</button>
        </form>
    </div> 
</template>


<style scoped>
.form{
    max-width: 350px;
    min-width: 270px;
    border-radius: 8px;
    box-shadow: 2px 5px 10px var(--parkoba-shadow);
}
input{
    background-color: var(--parkoba-text-color);
    color: var(--parkoba-background-color);
}
button{
    background: var(--parkoba-base-color);
}
</style>