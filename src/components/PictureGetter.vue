<script setup lang="ts">
import { reactive, ref } from "vue";
import { Cropper } from "vue-advanced-cropper";
import UnKnownPerson from "@/components/IonPerson.svg";
import { getBase64 } from "@/utils";
import type { MenuItem } from "primevue/menuitem";
import SpeedDial from "primevue/speeddial";

// const props = 
defineProps<{
    image: string | null;
    dialItems: MenuItem[];
    imageSelected: boolean;
}>();
const cropper = ref<InstanceType<typeof Cropper>>();
const stencilProps = reactive({
    resizable: false,
    aspectRatio: 1,
});
const stencilSize = reactive({
    width: 225,
    height: 225,
})


async function extract(useBase64 = false) {
    if (!cropper.value) { return; }
    const { canvas } = cropper.value.getResult();
    if (!canvas) { return; }
    let blob: string | Blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(async (v) => {
            resolve(v || new Blob());
        }, 'image/png', 1);
    });
    if (useBase64) { blob = await getBase64(blob); }
    return blob;
}
defineExpose({
    extract
});
</script>

<template>
    <SpeedDial :model="dialItems" type="linear" direction="left" :tooltipOptions="{ position: 'top', event: 'hover' }"
        showIcon="pi pi-camera" :transition-delay="40" :rotateAnimation="false" />
    <div class="bg-gray-400 flex items-center justify-center w-full h-full" v-if="!imageSelected">
        <UnKnownPerson fill="white" width="150" height="150" />
    </div>
    <Cropper ref="cropper" v-else :src="image" :stencilProps="stencilProps" :stencilSize="stencilSize"
        imageRestriction="stencil" :resizeImage="{ adjustStencil: false }" />
</template>

<style scoped></style>