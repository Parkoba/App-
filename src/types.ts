import { ComputedRef, Ref } from "vue"
import { BaseFieldProps, GenericObject } from 'vee-validate';

export type IntroPageSlide = {
    heading: string
    image?: string
    alt: string
}

export type toRef1<T> = {
    [K in keyof T]: T[K] | Ref<T[K]> | ComputedRef<T[K]>
}

export type SignUpDetails = {
    fullName: string
    email: string
    password: string
    phoneNumber: string
    profilePicture: Blob | null
}

export type SignUpInputProps = {
    icon: string,
    iconClick?: () => void,
    placeholder: string,
    invalid?: unknown,
    bindAttrs?: BaseFieldProps & GenericObject,
    type: string
} 

export type YupSignUpDetails = Omit<SignUpDetails, 'profilePicture'> & {
    password2: string
}

let a:YupSignUpDetails
