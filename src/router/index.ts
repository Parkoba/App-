import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { App, BackButtonListener, BackButtonListenerEvent } from '@capacitor/app';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import { USERPROFILE, profilePictureUri } from '@/constants';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/intro'
  // },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue')
  },
  {
     path: '/home',
     alias: '/',
     component: () => import('@/views/home/index.vue'),
  } as any,
  {
    name: 'intro',
    path: '/intro',
    component: () => import('@/views/Intro.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/SignUp.vue'),
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
getProfilePicture().catch();

let profilePicBlobUrl='';

async function getProfilePicture(){
  // let imageBlob=null;
  if(Capacitor.isNativePlatform()){
    const result=await Filesystem.getUri({
      directory: Directory.Data,
      path: USERPROFILE
    }).catch(()=>({uri: ''}));
    profilePictureUri.value = Capacitor.convertFileSrc(result.uri);
    return;
  }
  const result=await Filesystem.readFile({
    directory: Directory.Data,
    path: USERPROFILE,
  }).catch(()=>({data: ''}));
  profilePicBlobUrl=createBlobUrl(result.data)||'';
  profilePictureUri.value = profilePicBlobUrl;
  // if(Capacitor.isNativePlatform()) {
  //   const result = await Filesystem.readFile({
  //     path: USERPROFILE,
  //     directory: Directory.Data
  //   }).catch(()=>({data: ''}));
  //   const { value } = await Preferences.get({ key: 'profile_picture' });
  //   value && (profilePictureUri.value=value);
  // }
  // else{
  //   const result = await Filesystem.readFile({
  //    path: USERPROFILE,
  //    directory: Directory.Data
  //  }).catch(()=>({data: ''}));
  //  const imageBlob = Capacitor.isNativePlatform() ? dataURItoBlob(result.data) : (result.data || new Blob(['']));
  //  profilePicBlobUrl = createBlobUrl(imageBlob) || '';
  //  profilePictureUri.value = profilePicBlobUrl;
  // }
}

function createBlobUrl(blob: Blob|any){
    if(blob instanceof Blob){
      return URL.createObjectURL(blob);
    }
}

function dataURItoBlob(dataURI: unknown) {
  if(typeof dataURI !== 'string') return;
  let uri = dataURI.replace(/^data:/, '');
  
  const type = uri.match(/image\/[^;]+/)?.[0];
  const base64 = uri.replace(/^[^,]+,/, '');
  const arrayBuffer = new ArrayBuffer(base64.length);
  const typedArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < base64.length; i++) {
      typedArray[i] = base64.charCodeAt(i);
  }

  return new Blob([typedArray], { type });
}
router.afterEach(async () => {
  await getProfilePicture();
})
router.beforeEach(()=>{
  URL.revokeObjectURL(profilePicBlobUrl);
})

export default router;
