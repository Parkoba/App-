import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { App, BackButtonListener, BackButtonListenerEvent } from '@capacitor/app';
import { Filesystem, Directory } from '@capacitor/filesystem';
import TabsPage from '../views/TabsPage.vue'
import { BackButtonEvent, useBackButton, useIonRouter } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { PluginListenerHandle } from '@capacitor/core';
let i = 0;
export let timeout: number;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/get-started'
  },
  {
    path: '/get-started',
    component: () => import('@/views/IntroPage.vue')
  },
  // {
  //    path: '/login',
  //    component: () => import('@/views/Login.vue')
  // },
  {
    path: '/join',
    component: () => import('@/views/Join.vue'),
  },
  // {
  //   path: '/tabs/',
  //   component: TabsPage,
  //   children: [
  //     {
  //       path: '',
  //       redirect: '/tabs/tab1'
  //     },
  //     {
  //       path: 'tab1',
  //       component: () => import('@/views/Tab1Page.vue')
  //     },
  //     {
  //       path: 'tab2',
  //       component: () => import('@/views/Tab2Page.vue')
  //     },
  //     {
  //       path: 'tab3',
  //       component: () => import('@/views/Tab3Page.vue')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// function closeAppOnBack(e: BackButtonListenerEvent) {
//     i++;
//     e
//     console.log('Works')
//     timeout = setTimeout(() => {
//         if (i >= 2) {
//             if (timeout) clearTimeout(timeout);
//             i = 0;
//             return App.exitApp();
//         }
//     }, 500)
// }
// router.afterEach(async (to, from, next) => {
//   let a:PluginListenerHandle;
//   if (from.path === '/get-started') {
//      a= await App.addListener('backButton', closeAppOnBack);  
//   }
  
// })

useBackButton(-1, () => {
      const ionRouter = useIonRouter();
      if (!ionRouter.canGoBack()) {
          App.exitApp();
      }
});

export default router;
