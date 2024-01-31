<script setup lang="ts">
import { ref } from "vue";
import { Cropper } from "vue-advanced-cropper";
import SpeedDial from "primevue/speeddial";
import UnKnownPerson from "@/components/IonPerson.svg";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

const isImageSelected = ref(false),
    image = ref<string | null>(null),
    imageFile = ref<File>(),
    filePicker = ref<HTMLElement>();
async function onFileChange(e: Event) {
    // const image = await Camera.getPhoto({
    //     quality: 90,
    //     source: CameraSource.Photos,
    //     allowEditing: true,
    //     resultType: CameraResultType.Uri
    // });
    
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
        isImageSelected.value = true;
        imageFile.value=file;
        image.value = URL.createObjectURL(file);
    }
}
function removeImage() {
    isImageSelected.value = false;
    imageFile.value = undefined;
    image.value = null;
}

const items = ref([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            if (!image.value && !isImageSelected.value) {
                filePicker.value?.click();
            }
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            if (!imageFile.value) return;
            filePicker.value?.click();
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: removeImage
    },
])
</script>

<template>
    <div class="form w-full flex justify-center bg-white py-3 px-3 rounded-xl">
        <div class="w-[300px] flex flex-col justify-between">
            <div class="header text-center mb-5">
                <h1 class="text-3xl font-bold">Profile Picture</h1>
                <span class="text-sm text-gray-500 text-balance">Set a valid profile picture to let others know who you
                    are</span>
            </div>

            <div class="flex justify-center relative">
                <div class="w-60 h-60 rounded-full overflow-hidden">
                    <SpeedDial :model="items" type="linear" direction="left"
                        :tooltipOptions="{ position: 'top', event: 'hover' }" showIcon="pi pi-image" :transition-delay="50"
                        :rotateAnimation="false" />
                    <input ref="filePicker" accept="image/png, image/jpeg, image/jpg" type="file" hidden
                        @change="onFileChange">
                    <div class="bg-gray-400 flex items-center justify-center w-full h-full" v-if="!isImageSelected">
                        <UnKnownPerson fill="white" width="150" height="150" />
                    </div>
                    <Cropper v-else :src="image" :stencil-props="{
                        handlers: {},
                        movable: false,
                        resizable: false,
                    }" :stencil-size="{
    width: 500,
    height: 500,
}" image-restriction="stencil" />
                </div>
            </div>
            <div class="mt-10 w-full flex justify-center">
                <a @click.prevent="" href="#" class="underline cursor-pointer text-blue-700 mr-2.5 mb-2.5">Next</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.p-speeddial) {
    position: absolute;
    z-index: 1;
    right: 0;
}

:deep(.p-speeddial-button) {
    background-color: rgb(247, 244, 244);
    margin: 80px 5px 0 auto;
    padding: 15px;
}

:deep(.p-speeddial-button .pi) {
    font-size: 20px;
}

:deep(.p-speeddial-button):hover {
    background-color: rgb(241, 233, 233);
}

:deep(.p-speeddial-action) {
    background-color: rgb(241, 233, 233);
}

:deep(.p-speeddial-list) {
    gap: 6px;
    margin: 80px 7px 0 0;
}</style>
