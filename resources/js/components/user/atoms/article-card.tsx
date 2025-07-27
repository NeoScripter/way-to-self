import { Link } from "@inertiajs/react"
import LazyImage from "./lazy-image"
import { Article } from "@/types/model"

type ArticleCardProps = {
    article: Article,
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const articleUrl = route('user.articles.show', article.id);

    return (
        <li className="">
            <Link
                href={articleUrl}
                preserveScroll
                aria-labelledby={`article-title-${article.id}`}
                aria-describedby={`article-description-${article.id}`}
                className="text-dark-green text-lg block group"
            >
                {article.thumbnail != null &&
                    <LazyImage
                        img={article.thumbnail}
                        parentClass="rounded-2xl aspect-video mb-3.5"
                        imgClass="group-hover:scale-120" />
                }

                <div className="space-y-2">
                    <h4
                        id={`article-title-${article.id}`}
                        className="mb-2 font-medium text-lg leading-tight"
                    >
                        {article.title}
                    </h4>

                    <p
                        id={`article-description-${article.id}`}
                        className="text-sm leading-relaxed"
                    >
                        {article.description}
                    </p>

                </div>

                <span className="sr-only">
                    Читать полную статью: {article.title}
                </span>
            </Link>
        </li>
    )
}
