import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import { PrimeVueConfiguration } from "primevue/config";
import ToastService from "primevue/toastservice";
import router from "./router";
import Ripple from "primevue/ripple";

import { IonicVue } from "@ionic/vue";

import "vue-advanced-cropper/dist/style.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
// import '@ionic/vue/css/normalize.css';
// import '@ionic/vue/css/structure.css';
// import '@ionic/vue/css/typography.css';
import "../public/styles/main.css";

/* Optional CSS utils that can be commented out */
// import '@ionic/vue/css/padding.css';
// import '@ionic/vue/css/float-elements.css';
// import '@ionic/vue/css/text-alignment.css';
// import '@ionic/vue/css/text-transformation.css';
// import '@ionic/vue/css/flex-utils.css';
// import '@ionic/vue/css/display.css';

/* Theme variables */
import "./theme/parkoba.css";

/* Tailwind CSS */
import "@/style.css";

import "primeicons/primeicons.css";
import "primevue/resources/themes/viva-light/theme.css";
// import 'primevue/resources/themes/lara-dark-blue/theme.css'

import { createHead } from "@unhead/vue";

import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { Preferences } from "@capacitor/preferences";
import { checkUserValid } from "./utils";
defineCustomElements(window);

const app = createApp(App)
  .use(IonicVue)
  .use<PrimeVueConfiguration>(PrimeVue, {
    ripple: true,
  })
  .use(ToastService)
  .use(router)
  .use(createHead())
  .directive("ripple", Ripple);

router.isReady().then(async () => {
  await handleUserValid()
  app.mount("#app");
});

async function handleUserValid(){
  const [{ value: hasDoneIntro }, { value: isUserValid }] = await checkUserValid();
  const { currentRoute: {value: {path}} } = router;
  if(router.getRoutes().some((a)=>a.path === path) && !(["/intro", "/register", "/login"].includes(path))) {
    if (!hasDoneIntro) {
      await router.replace("/intro");
    } else if (hasDoneIntro && isUserValid !== "true") {
      await router.replace("/register");
    }
  }
}