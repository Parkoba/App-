import { createApp } from 'vue'
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { PrimeVueConfiguration } from 'primevue/config';
import ToastService from 'primevue/toastservice';
import router from './router';
import Ripple from 'primevue/ripple'

import { IonicVue } from '@ionic/vue';

import 'vue-advanced-cropper/dist/style.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/vue/css/normalize.css';
// import '@ionic/vue/css/structure.css';
// import '@ionic/vue/css/typography.css';
import '../public/styles/main.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/vue/css/padding.css';
// import '@ionic/vue/css/float-elements.css';
// import '@ionic/vue/css/text-alignment.css';
// import '@ionic/vue/css/text-transformation.css';
// import '@ionic/vue/css/flex-utils.css';
// import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/parkoba.css';

/* Tailwind CSS */
import '@/style.css';

import 'primeicons/primeicons.css';
import 'primevue/resources/themes/viva-light/theme.css'
// import 'primevue/resources/themes/lara-dark-blue/theme.css'

import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

const app = createApp(App)
.use(IonicVue).use<PrimeVueConfiguration>(PrimeVue, {
     ripple: true, 
  }).use(ToastService).use(router).directive('ripple', Ripple);
  
router.isReady().then(() => {
  app.mount('#app');
});