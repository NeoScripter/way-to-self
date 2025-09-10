export type Article = {
    id: number;
    title: string;
    description: string;
    body: string;
    html: string;
    type: ArticleType;
    created_at?: string;
    updated_at?: string;
    images?: Image;
    image?: Image;
    thumbnail?: Image;
};
export type Audio = {
    id: number;
    title: string;
    description: string;
    raw_path: string;
    original_path: string;
    hls_path?: string;
    duration: number;
    rating: number;
    body: string;
    html: string;
    type: string;
    created_at?: string;
    updated_at?: string;
    original_url: any;
    hls_url: any;
    image?: Image;
    filters?: any;
};
export type CategoryFilter = {
    id: number;
    title: string;
    name: string;
    category: string;
    created_at?: string;
    updated_at?: string;
    recipes?: any;
    exercises?: any;
    articles?: any;
    audios?: any;
};
export type Exercise = {
    id: number;
    title: string;
    description: string;
    body: string;
    html: string;
    duration: number;
    rating: number;
    type: string;
    created_at?: string;
    updated_at?: string;
    image?: Image;
    video?: Video;
    category?: ExerciseCategory;
};
export type ExerciseCategory = {
    id: number;
    exercise_id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
};
export type FaqItem = {
    id: number;
    title: string;
    body: string;
    html: string;
    type: string;
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
export type Practice = {
    id: number;
    title: string;
    description: string;
    duration: number;
    rating: number;
    body: string;
    html: string;
    type: string;
    created_at?: string;
    updated_at?: string;
    image?: Image;
    video?: Video;
    filters?: any;
};
export type Recipe = {
    id: number;
    title: string;
    description: string;
    duration: number;
    rating: number;
    type: string;
    created_at?: string;
    updated_at?: string;
    image?: Image;
    video?: Video;
    infos?: RecipeInfo[];
    steps?: RecipeStep[];
    category?: RecipeCategory;
    filters?: any;
};
export type RecipeCategory = {
    id: number;
    recipe_id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
};
export type RecipeInfo = {
    id: number;
    recipe_id: number;
    order: number;
    title: string;
    body?: string;
    html?: string;
    created_at?: string;
    updated_at?: string;
    recipe?: Recipe;
    image?: Image;
};
export type RecipeStep = {
    id: number;
    recipe_id: number;
    order: number;
    body: string;
    html: string;
    created_at?: string;
    updated_at?: string;
    image?: Image;
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
    route: string;
    description: string;
    price: number;
    created_at?: string;
    updated_at?: string;
    images?: Image;
    image?: Image;
    cart?: TierCart[];
};
export type TierCart = {
    id: number;
    user_id?: number;
    session_id?: string;
    created_at?: string;
    updated_at?: string;
    tiers?: Tier[];
};
export type Video = {
    id: number;
    title: string;
    video_path: string;
    hls_path?: string;
    videoable_type: string;
    videoable_id: number;
    conversion_progress: number;
    created_at?: string;
    updated_at?: string;
    videoable?: any;
};
export enum ArticleType {
    NEWS = "news",
    SOUL = "soul",
    NUTRITION = "nutrition",
    EXERCISE = "exercise"
}
export enum CategoryType {
    RECIPES = "recipes",
    EXERCISES = "exercises",
    AUDIOS = "audios",
    ARTICLES = "articles",
    PRACTICES = "practices"
}
export enum ContentType {
    FREE = "free",
    PAID = "paid"
}
