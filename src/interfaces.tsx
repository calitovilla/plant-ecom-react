export default interface Category{
    id: number;
    title: string;
    imageUrl: string;
}

export interface SignUpFormFields {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
