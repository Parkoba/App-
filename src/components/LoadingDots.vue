<script setup lang="ts">

</script>
        
<template>
    <section class="dots-container flex justify-center items-center gap-5 h-full w-full">
        <div class="dot" style="--delay: 0.1s;"></div>
        <div class="dot" style="--delay: -0.1s;"></div>
        <div class="dot" style="--delay: -0.3s;"></div>
        <div class="dot" style="--delay: -0.1s;"></div>
        <div class="dot" style="--delay: 0.1s;"></div>
    </section>
</template>


<style scoped>
.dot {
  height: 12px;
  width: 12px;
  border-radius: 10px;
  background-color: #7098c9;
  animation: pulse 1.5s infinite ease-in-out;
  animation-delay: var(--delay);
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    background-color: #7098c9;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #5b71a7;
    box-shadow: 0 0 0 3px rgba(178, 212, 252, 0.603);
  }

  100% {
    transform: scale(0.8);
    background-color: #7098c9;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
}
</style>