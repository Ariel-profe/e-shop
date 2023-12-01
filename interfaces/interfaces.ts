import { User } from "@prisma/client";

export type IUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export interface IProduct {
    id: string,
    name: string,
    slug: string,
    description: string,
    price: number,
    brand: string,
    category: string,
    inStock: boolean,
    images: IProductImage[];
    reviews: IProductReview[];
    status: boolean;
}

export interface IProductImage {
    color: string;
    colorCode: string;
    image: string;
};

export interface IProductReview {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdDate: string;
    user: IUser;
};

export type CartProductType = {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    brand: string;
    selectedImg: SelectedImgType;
    quantity: number;
    price: number;
};

export type SelectedImgType = {
    color: string;
    colorCode: string;
    image: string;
};