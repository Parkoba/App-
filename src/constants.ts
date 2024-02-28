import { Capacitor } from "@capacitor/core";
import { ref } from "vue";

export const USERPROFILE = 'user/profile_picture.png';
export const profilePictureUri = ref<string>();
export const isNative = Capacitor.isNativePlatform();
