import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { App, BackButtonListener, BackButtonListenerEvent } from '@capacitor/app';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import { USERPROFILE, profilePictureUri } from '@/constants';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

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
let profilePicBlobUrl='';
getProfilePicture().catch();

async function getProfilePicture(){
  if(Capacitor.isNativePlatform()) {
    const { value } = await Preferences.get({ key: 'profile_picture' });
    value && (profilePictureUri.value=value);
  }
  else{
   const result = await Filesystem.readFile({
     path: USERPROFILE,
     directory: Directory.Data
   }).catch(()=>({data: ''}));
   profilePicBlobUrl = createBlobUrl(result.data) || '';
   profilePictureUri.value = profilePicBlobUrl;
  }
}

function createBlobUrl(blob: Blob|any){
    if(blob instanceof Blob){
      return URL.createObjectURL(blob);
    }
}

router.afterEach(async (to, from) => {
  await getProfilePicture();
})
router.beforeEach(()=>{
  URL.revokeObjectURL(profilePicBlobUrl);
})
export default router;
