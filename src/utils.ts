import {
  ref,
  Component,
  defineAsyncComponent,
  DefineComponent,
  onMounted,
  unref,
} from "vue";
import { injectHead, useHead } from "@unhead/vue";
import FormLoading from "@/components/FormLoading.vue";
import {
  TransitionOptions,
  createAnimation,
  getIonPageElement,
  onIonViewDidEnter,
  Animation,
  onIonViewWillEnter,
  onIonViewWillLeave,
} from "@ionic/vue";

export function bounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

/**
 * Returns a lazy-loaded component and a boolean indicating if the component has been loaded.
 * @param fn - The function that loads the component.
 * @returns An object with the boolean isLoaded and the lazy-loaded component.
 */
export function useLazyComponent<
  T extends () => Promise<{ default: Component }>
>(fn: T, loaderComp: Component | null, errorComp?: Component, delay?: number) {
  // const isLoaded: Ref<boolean> = ref(false);
  const loadingComponent =
    loaderComp === null ? undefined : !loaderComp ? FormLoading : loaderComp;
  const comp = defineAsyncComponent({
    loader: () => {
      return new Promise<Awaited<ReturnType<T>>["default"]>(
        (resolve, reject) => {
          setTimeout(async () => {
            try {
              const { default: component } = await fn();
              // isLoaded.value = true;
              resolve(component);
            } catch (error) {
              reject(error);
            }
          }, delay || 0);
        }
      );
    },
    loadingComponent,
    errorComponent: errorComp,
    timeout: 10000,
  });
  preloadAsyncComponent(comp);
  return { comp /*isLoaded*/ };
}

export function getBase64(blob: Blob | File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
  });
}

export const preloadAsyncComponent = (fn: DefineComponent | Component) => {
  const a = () => {
    (fn as DefineComponent).__asyncLoader();
  };
  document.readyState === "complete"
    ? a()
    : document.addEventListener("readystatechange", (e) => {
        if (document.readyState === "complete") setTimeout(a, 4000);
      });
};

export function useIonHead(obj: Parameters<typeof useHead>[0]) {
  // const head = useHead(obj);
  // const router = useRouter();
  // const {fullPath} = useRoute();
  // router.beforeResolve(() => {
  //   if(head){
  //      head.dispose();
  //   }
  // })
  // router.afterEach((to) => {
  //    if(to.fullPath === fullPath){
  //    }
  // })
  let headInject = injectHead();
  let headObj: ReturnType<typeof useHead>;
  onMounted(() => {
    if (!headObj) {
      headObj = headInject.push(obj);
    }
  });

  if (!import.meta.env.SSR) {
    onIonViewWillEnter(async () => {
      if (!headObj) return;
      headObj = headInject.push(obj);
      console.log(obj.title);
    });

    onIonViewWillLeave(() => {
      if (!headObj) return;
      headObj.dispose();
    });
  }
}

export const formAnimation1 = (
  _: HTMLElement,
  opts: TransitionOptions
): Animation => {
  const OFF_BOTTOM = window.innerHeight / 2 + "px";
  const CENTER = "0px";

  const backDirection = opts.direction === "back";
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;
  const rootTransition = createAnimation();

  if (!backDirection) {
    const ionPageElement = getIonPageElement(enteringEl);

    rootTransition
      .addElement(ionPageElement)
      .fill("both")
      .beforeRemoveClass("ion-page-invisible");
    // animate the component itself
    // if (backDirection) {
    //   rootTransition.duration((opts.duration ?? 0) || 500).easing('ease-in-out');
    // } else {
    rootTransition
      .duration((opts.duration ?? 0) || 300)
      .easing("ease-in-out")
      .fromTo("transform", `translateY(${OFF_BOTTOM})`, `translateY(${CENTER})`)
      .fromTo("opacity", 0, 1);
  }
  // }

  // setup leaving view
  else {
    // leaving content
    // rootTransition.duration((opts.duration ?? 0) || 500).easing('ease-in-out');

    rootTransition
      .easing("ease-in-out")
      .addElement(getIonPageElement(leavingEl!))
      .onFinish((currentStep) => {
        // if (currentStep === 1 && leavingPage.elements.length > 0) {
        //   leavingPage.elements[0].style.setProperty('display', 'none');
        // }
      })
      .fromTo("transform", `translateY(${CENTER})`, `translateY(${OFF_BOTTOM})`)
      .fromTo("opacity", 1, 0);

    // leavingPage.addAnimation(leavingPage);
  }

  return rootTransition;
};

export const formAnimation = (
  _: HTMLElement,
  opts: TransitionOptions
): Animation => {
  const OFF_BOTTOM = window.innerHeight / 2 + "px";
  const CENTER = "0px";

  const backDirection = opts.direction === "back";
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;

  const ionPageElement = getIonPageElement(enteringEl) as HTMLElement;
  // const enteringToolbarEle = ionPageElement.querySelector('ion-toolbar');
  const rootTransition = createAnimation();

  rootTransition.addElement(ionPageElement).fill("both");
  // .beforeRemoveClass('ion-page-invisible');
  ionPageElement.style.setProperty("z-index", "2");
  rootTransition
    .duration((opts.duration ?? 0) || 500)
    .easing("ease-in-out")
    .fromTo("opacity", 0, 1)
    .fromTo("transform", `translateY(${OFF_BOTTOM})`, `translateY(${CENTER})`)
    .onFinish(() => {
      ionPageElement.style.removeProperty("z-index");
    });

  // animate the component itself
  // if (!backDirection) {
  //   rootTransition
  //     .duration((opts.duration ?? 0) || 500)
  //     .easing('ease-in-out')
  //     .fromTo('opacity', 0, 1)
  //     .fromTo('transform', `translateY(${OFF_BOTTOM})`, `translateY(${CENTER})`);
  // }
  // else{
  //   rootTransition
  //     .duration((opts.duration ?? 0) || 500)
  //     .easing('ease-in-out')
  //     .fromTo('opacity', 1, 0)
  //     .fromTo('transform', `translateY(${CENTER})`, `translateY(${OFF_BOTTOM})`);
  // }

  // Animate toolbar if it's there
  // if (enteringToolbarEle) {
  //   const enteringToolBar = createAnimation();
  //   enteringToolBar.addElement(enteringToolbarEle);
  //   rootTransition.addAnimation(enteringToolBar);
  // }

  // setup leaving view
  // if (leavingEl && backDirection) {
  //   // leaving content
  //   rootTransition.duration((opts.duration ?? 0) || 500).easing('ease-in-out');

  //   const leavingPage = createAnimation();
  //   leavingPage
  //     .addElement(getIonPageElement(leavingEl))
  //     .onFinish((currentStep) => {
  //       // if (currentStep === 1 && leavingPage.elements.length > 0) {
  //       //   leavingPage.elements[0].style.setProperty('display', 'none');
  //       // }
  //     })
  //     .fromTo('transform', `translateY(${CENTER})`, `translateY(${OFF_BOTTOM})`)
  //     .fromTo('opacity', 1, 0);

  //   rootTransition.addAnimation(leavingPage);
  // }

  return rootTransition;
};
