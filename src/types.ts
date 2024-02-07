import { Ref } from "vue"

export type IntroPageSlide = {
    heading: string
    image?: string
    alt: string
}

export type toRef1<T> = {
    [K in keyof T]: T[K] | Ref<T[K]>
}

export type SignUpDetails = {
    fullName: string
    email: string
    password: string
    phoneNumber: string
    address: string
    profilePicture: Blob | null
}



export type YupSignUpDetails = Omit<SignUpDetails, 'profilePicture'> & {
    password2: string
}

let a:YupSignUpDetails
