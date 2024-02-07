import { ref, Component, defineAsyncComponent, AsyncComponentLoader, Ref } from 'vue';
import FormLoading from '@/components/FormLoading.vue';

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
export function useLazyComponent<T extends () => Promise<{ default: Component }>>(
  fn: T
) {
  const isLoaded: Ref<boolean> = ref(false);
  const comp = defineAsyncComponent({
    loader: () => {
      return new Promise<Awaited<ReturnType<T>>['default']>((resolve, reject) => {
        setTimeout(async () => {
          try {
            const { default: component } = await fn();
            isLoaded.value = true;
            resolve(component);
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });
    },
    loadingComponent: FormLoading,
    timeout: 10000,
  });
  return { isLoaded, comp };
}

export async function getBlobFromUrl(url: string){
  const response = await fetch(url);
  const blob = await response.blob();
  return blob
}