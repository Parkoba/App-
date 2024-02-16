<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { Cropper, CropperResult } from "vue-advanced-cropper";
import SpeedDial from "primevue/speeddial";
import UnKnownPerson from "@/components/IonPerson.svg";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { MenuItem, SignUpDetails } from "@/types";
import { USERPROFILE, isNative, profilePictureUri } from "@/constants";
import { Capacitor } from "@capacitor/core";
import { getBase64 } from "@/utils";
import PictureGetter from "./PictureGetter.vue";

const isImageSelected = ref(false),
    image = ref<string | null>(null),
    profilePicEl = ref<InstanceType<typeof PictureGetter>>();
const signUpForm = inject<SignUpDetails>('signUpForm')!;
async function onFileChange(/**e: Event*/) {
    const img = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Photos,
        allowEditing: true,
        resultType: CameraResultType.Uri
    }).catch(() => null);
    if (!img) { return; }
    image.value = img.webPath || null;
    isImageSelected.value = true;
}

function removeImage() {
    isImageSelected.value = false;
    URL.revokeObjectURL(image.value as string);
    image.value = null;
}

async function uploadImage() {
    let el = profilePicEl.value;
    if (!el) return;
    const picture = await el.extract(isNative);
    if (!picture) { return; }
        // signUpForm.profilePicture = picture;
        const fileResult = await Filesystem.writeFile({
            data: picture,
            path: USERPROFILE,
            directory: Directory.Data,
            recursive: true,
        }).catch(() => null);
        if (!fileResult) return;
        const uri = Capacitor.convertFileSrc(fileResult.uri);
        if (isNative) {
            await Preferences.set({
                key: 'profile_picture',
                value: uri
            });
        }
        profilePictureUri.value = isNative? uri: URL.createObjectURL(picture as Blob);
}

const items = ref<MenuItem[]>([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            if (!image.value && !isImageSelected.value) {
                onFileChange();
            }
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            if (!isImageSelected.value) { return; }
            onFileChange();
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
        <div class="w-[300px] flex flex-col items-center justify-between">
            <div class="header text-center mb-5">
                <h1 class="text-3xl font-bold">Profile Picture</h1>
                <span class="text-sm text-gray-500 text-balance">Set a valid profile picture to let others know who you
                    are</span>
            </div>
            <img :src="profilePictureUri"
                class="rounded-full flex items-center justify-center text-xs mb-2 border border-black" height="70"
                width="70" alt="Profile Pic">
            <div class="flex justify-center relative">
                <div class="w-[275px] h-[275px] rounded-full overflow-hidden">
                    <PictureGetter :dialItems="items" :image="image" :imageSelected="isImageSelected" ref="profilePicEl" />
                </div>
            </div>
            <div class="mt-10 w-full flex justify-center">
                <a v-if="isImageSelected" @click.prevent="uploadImage" href="#"
                    class="underline cursor-pointer text-blue-700 mr-2.5 mb-2.5">Next</a>
                <a v-else @click.prevent="" href="#" class="underline cursor-pointer text-blue-700 mr-2.5 mb-2.5">Skip</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.p-speeddial) {
    position: absolute;
    z-index: 1;
    right: -25px;
}

:deep(.p-speeddial-button) {
    background-color: rgb(252, 251, 251);
    margin-top: 100px;
    padding: 15px;
    border: 2px solid rgb(194, 194, 194);
}

:deep(.p-speeddial-button .pi) {
    font-size: 20px;
}

:deep(.p-speeddial-button):hover {
    background-color: rgb(243, 237, 237);
}

:deep(.p-speeddial-action) {
    background-color: rgb(247, 242, 242);
}

:deep(.p-speeddial-list) {
    gap: 6px;
    margin: 100px 7px 0 0;
}</style>
