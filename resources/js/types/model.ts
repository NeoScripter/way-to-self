export type Article = {
    id: number;
    title: string;
    description: string;
    body: string;
    html: string;
    type: string;
    created_at?: string;
    updated_at?: string;
    images?: Image;
    image?: Image;
    thumbnail?: Image;
};
export type FaqItem = {
    id: number;
    title: string;
    body: string;
    html: string;
    created_at?: string;
    updated_at?: string;
};
export type Image = {
    id: number;
    path: string;
    tiny_path: string;
    alt: string;
    imageable_type: string;
    imageable_id: number;
    type: string;
    created_at?: string;
    updated_at?: string;
    imageable?: any;
};
export type Review = {
    id: number;
    body: string;
    author: string;
    created_at?: string;
    updated_at?: string;
    image?: Image;
};
export type Tier = {
    id: number;
    name: string;
    description: string;
    price: number;
    tier_cart_id?: number;
    created_at?: string;
    updated_at?: string;
    images?: Image;
    image?: Image;
};
export type TierCart = {
    id: number;
    user_id?: number;
    session_id?: string;
    created_at?: string;
    updated_at?: string;
};
