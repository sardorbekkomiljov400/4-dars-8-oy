export interface CategoryType {
    id: string | number;
    name: string;
}

export interface ProductType {
    id: string | number;
    name: string;
    price: number;
    categoryId: string | number;
}

export interface UserType {
    id: string | number;
    username: string;
    password?: string;  
    fullName?: string;
}