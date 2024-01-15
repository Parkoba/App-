<script setup lang="ts">

</script>

<template>
    <img src="/earth.jpg" alt="Earth" />
    <img src="/pin.jpg" class="pin" alt="Location Pin" />
</template>

<style scoped>
.pin{
    width: 70px;
    top: -10px;
    left: 0;
    transform: rotateZ(-40deg);
    transform-box: fill-box;
    transform-origin: 200px;
    animation: go-round 5s;
}
img{
    position: absolute;
    max-width: 200px;
}
@keyframes go-round {
    0%{
        transform: rotateZ(-40deg);
    }
    100%{
        transform: rotateZ(-400deg);
    }
}
</style>