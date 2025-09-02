import { Article } from '@/types/model';
import { Link } from '@inertiajs/react';
import LazyImage from './lazy-image';

type ArticleCardProps = {
    article: Article;
    className?: string;
    prefix: string;
};

export default function ArticleCard({ prefix, article, className }: ArticleCardProps) {
    const articleUrl = route(prefix, article.id);

    return (
        <li className={className}>
            <Link
                prefetch
                as="button"
                href={articleUrl}
                aria-labelledby={`article-title-${article.id}`}
                aria-describedby={`article-description-${article.id}`}
                className="group block cursor-pointer text-lg"
            >
                {article.thumbnail != null && (
                    <LazyImage
                        img={article.thumbnail.path}
                        alt={article.thumbnail.alt}
                        tinyImg={article.thumbnail.tiny_path}
                        parentClass="rounded-2xl aspect-video mb-3.5"
                        imgClass="group-hover:scale-120"
                    />
                )}

                <div className="space-y-2">
                    <h4
                        id={`article-title-${article.id}`}
                        className="mb-2 text-lg text-balance leading-tight font-medium"
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
    );
}
