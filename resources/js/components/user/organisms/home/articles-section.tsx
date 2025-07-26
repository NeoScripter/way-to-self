import { usePage } from "@inertiajs/react";
import SecondaryHeading from "../../atoms/secondary-heading"
import { Article } from "@/types/model";

export default function ArticlesSection() {
    const { articles } = usePage<{articles: Article[]}>().props;

    console.log(articles)

    return (
        <>
            <SecondaryHeading text="Примеры упражнений" className="mb-17" />

            <ul className="mb-11 space-y-4 sm:mb-16 sm:space-y-6 lg:space-y-8 xl:mb-20 2xl:space-y-10">
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>

        </>

    )
}
