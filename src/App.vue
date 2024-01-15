<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
  .ios body {
    --ion-background-color: #f2f2f6;
    --ion-item-background: #fff;
  }

  /* This sets a different background and item background in light mode on md */
  .md body {
    --ion-background-color: var(--parkoba-background-color);
    --ion-item-background: #fff;

  }
    /* This is added for the flashing that happens when toggling between themes */
  ion-item {
    --transition: none;
  }
</style>
