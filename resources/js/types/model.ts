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
    alt: string;
    imageable_type: string;
    imageable_id: number;
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
