<script setup lang="ts">

</script>

<template>
    <img src="/images/earth.jpg" class="earth" alt="Earth" />
    <img src="/images/pin.jpg" class="pin" alt="Location Pin" />
</template>

<style scoped>
.pin {
    width: 50px;
    top: 40%;
    left: 40%;
    /* rotate: -40deg; */
    /* left: 0; */
    /* transform: ; */
    /* transform-box: fill-box; */
    /* transform-origin: center center; */
    animation: go-round 50s infinite;
    animation-timing-function: linear;
    /* transform: rotate(-85deg) translateX(100px) rotate(45deg); */
}
img {
    position: absolute;
    max-width: 200px;
}

/* @keyframes rotate-earth {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
} */
/* @keyframes go-round {
    from {
        transform: rotate(0deg) translateX(100px) rotate(45deg);
    }

    to {
        transform: rotate(360deg) translateX(100px) rotate(405deg);
    }
} */

@keyframes go-round {
    from {
        transform: rotate(-85deg) translateX(102px) rotate(45deg);
    }
    /* 25% {
        transform: rotate(90deg) translateX(100px) rotate(45deg);
    }
    50% {
        transform: rotate(180deg) translateX(100px) rotate(45deg);
    }
    75% {
        transform: rotate(270deg) translateX(100px) rotate(45deg);
    } */
    to {
        transform: rotate(275deg) translateX(102px) rotate(45deg);
    }
}
/* @keyframes go-round {
    0% {
      transform: translateX(100px) rotate(0deg);
    }
    100% {
      transform: translateX(100px) rotate(360deg);
    }
  } */</style>