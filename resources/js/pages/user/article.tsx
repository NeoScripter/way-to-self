import LazyImage from "@/components/user/atoms/lazy-image";
import UserLayout from "@/layouts/user/user-layout";
import { Article as ArticleType } from "@/types/model";
import { usePage } from "@inertiajs/react";

export default function Article() {
    const { article } = usePage<{ article: ArticleType }>().props;

    return (
        <UserLayout
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >

            <article className="max-w-330 mx-auto">
                <h1 className="font-heading font-medium uppercase text-center text-2xl md:text-5xl xl:text-6xl mt-10 md:mt-20 xl:mt-30">
                    {article.title}
                </h1>

                {article.image &&
                    <LazyImage parentClass="aspect-video rounded-2xl my-9 md:my-12.5 xl:my-15" img={article.image.path} alt={article.image.alt} tinyImg={article.image.tiny_path} />
                }

                <div className="mb-43 prose prose-neutral prose-sm md:prose-base xl:prose-xl md:mb-47 xl:mb-63 max-w-full" dangerouslySetInnerHTML={{ __html: article.html }}>
                </div>

            </article>

        </UserLayout>
    )
}
