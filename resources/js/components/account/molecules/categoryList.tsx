import ContentCard from '@/components/user/atoms/content-card';
import NoItems from '@/components/user/atoms/no-items';
import Pagination from '@/components/user/atoms/pagination';
import { PaginationMeta } from '@/lib/types/pagination';

type BaseItem = {
    id: number | string;
    title: string;
    image?: {
        path?: string;
        tiny_path?: string;
        alt?: string;
    };
    description: string;
    duration?: number;
    rating?: number;
    category?: {
        name?: string;
    };
};

type CategoryListProps<T extends BaseItem> = {
    items: PaginationMeta<T>;
    getHref: (item: T) => string;
    label: string;
    scrollElementId?: string;
};

export default function CategoryList<T extends BaseItem>({
    items,
    getHref,
    label,
    scrollElementId = 'list',
}: CategoryListProps<T>) {
    return (
        <div
            id={scrollElementId}
            className="w-full scroll-mt-80 md:scroll-mt-52 xl:mx-auto xl:max-w-250"
        >
            {items.data.length > 0 ? (
                <>
                    <ul className="grid w-full shrink-0 gap-6 sm:grid-cols-[repeat(auto-fit,_minmax(18.75rem,_1fr))] xl:grid-cols-3">
                        {items.data.map((item) => (
                            <ContentCard
                                key={item.id}
                                type=""
                                className="mx-auto w-full max-w-80"
                                data={{
                                    href: getHref(item),
                                    name: item.title,
                                    img: item.image?.path,
                                    tinyImg: item.image?.tiny_path,
                                    alt: item.image?.alt,
                                    description: item.description,
                                    duration:
                                        'duration' in item
                                            ? item.duration
                                            : undefined,
                                    rating:
                                        'rating' in item
                                            ? item.rating
                                            : undefined,
                                    category:
                                        'category' in item
                                            ? item.category?.name
                                            : undefined,
                                }}
                            />
                        ))}
                    </ul>

                    <Pagination
                        meta={items}
                        label={label}
                        className="mx-auto max-w-330 text-white"
                        shouldScroll={false}
                        scrollElementId={scrollElementId}
                    />
                </>
            ) : (
                <NoItems />
            )}
        </div>
    );
}
