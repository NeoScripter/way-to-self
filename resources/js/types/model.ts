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
    complexity: number;
    body: string;
    html: string;
    type: string;
    created_at?: string;
    updated_at?: string;
    original_url: any;
    hls_url: any;
    stream_path: any;
    image?: Image;
    filters?: any;
};
export type CategoryFilter = {
    id: number;
    title: string;
    name?: string;
    category?: string;
    created_at?: string;
    updated_at?: string;
    recipes?: any;
    exercises?: any;
    programs?: any;
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
    complexity: number;
    type: string;
    created_at?: string;
    updated_at?: string;
    image?: Image;
    video?: Video;
    category?: ExerciseCategory;
    program_blocks?: ProgramBlock[];
    filters?: CategoryFilter[];
};
export type ExerciseCategory = {
    id: number;
    exercise_id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    exercise?: Exercise;
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
export type Plan = {
    id: number;
    title: string;
    enabled: any;
    description: string;
    price: number;
    tier_count: number;
    created_at?: string;
    updated_at?: string;
    image?: Image;
};
export type Practice = {
    id: number;
    title: string;
    description: string;
    duration: number;
    complexity: number;
    body: string;
    html: string;
    type: string;
    created_at?: string;
    updated_at?: string;
    image?: Image;
    video?: Video;
    filters?: any;
};
export type Program = {
    id: number;
    title: string;
    description: string;
    body: string;
    html: string;
    duration: number;
    complexity: number;
    type: string;
    created_at?: string;
    updated_at?: string;
    image?: Image;
    video?: Video;
    filters?: any;
    blocks?: ProgramBlock[];
};
export type ProgramBlock = {
    id: number;
    program_id: number;
    title: string;
    description: string;
    created_at?: string;
    updated_at?: string;
    program?: Program;
    exercises?: Exercise[];
};
export type Promo = {
    id: number;
    name: string;
    expires_at: string;
    discount: number;
    discount_type: string;
    enabled: any;
    created_at?: string;
    updated_at?: string;
    tier_carts?: TierCart[];
};
export type Recipe = {
    id: number;
    title: string;
    description: string;
    duration: number;
    complexity: number;
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
export type Role = {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
};
export type Tier = {
    id: number;
    name: string;
    route: string;
    telegram_chat_id: number;
    tg_greet: string;
    tg_greet_html?: string;
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
    promo_id?: number;
    created_at?: string;
    updated_at?: string;
    tiers?: Tier[];
    promo?: Promo;
};
export type TierUser = {
    id: number;
    tier_id: number;
    user_id: number;
    warning_count: number;
    expires_at?: string;
    created_at?: string;
    updated_at?: string;
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
export type VisitorLog = {
    id: number;
    ip_address: string;
    url: string;
    visited_date: string;
    visited_at: string;
    created_at?: string;
    updated_at?: string;
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
    PRACTICES = "practices",
    PROGRAMS = "programs"
}
export enum ContentType {
    FREE = "free",
    PAID = "paid"
}
export enum DiscountType {
    PERCENT = "percent",
    CURRENCY = "currency"
}
export enum RoleEnum {
    USER = "user",
    EDITOR = "editor",
    ADMIN = "admin"
}
