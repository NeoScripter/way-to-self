import TrashBtn from '@/components/admin/atoms/trash-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import LazyImage from '@/components/user/atoms/lazy-image';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { shortenDescription } from '@/lib/helpers/shortenDescription';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Article } from '@/types/model';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { bodyMenuItems } from '../body/body-menu-items';


export default function Index() {
    const {
        articles,
        count,
        namespace = 'news',
    } = usePage<{
        articles: PaginationMeta<Article>;
        count: number;
        namespace: string;
    }>().props;

    const [selectedArticle, setSelectedArticle] = useState<Article | null>(
        null,
    );

    const badge = pluralizeRu(count, 'статья', 'статьи', 'статей');

    const menuItems = () => {
        if (namespace === 'body') {
            return bodyMenuItems;
        }

        return undefined;
    }

    return (
        <AdminLayout topMenuItems={menuItems()}>
            <TableHeader
                only={['articles']}
                label={'все статьи'}
                badge={`${count} ${badge}`}
                createRoute={route(`admin.${namespace}.articles.create`)}
            />
            <Table
                meta={articles}
                width="min-w-150 sm:min-w-180 lg:min-w-220 space-y-8"
                columns={['Фото', 'Заголовок', 'Краткое описание', '']}
                isEmpty={articles.data.length === 0}
                columnClass="!text-center"
            >
                {articles.data.map((article) => (
                    <ArticleItem
                        key={article.id}
                        article={article}
                        onClick={() => setSelectedArticle(article)}
                    />
                ))}
            </Table>

            {selectedArticle != null && (
                <ConfirmationDialog
                    show={selectedArticle != null}
                    closeDialog={() => setSelectedArticle(null)}
                    title="Вы точно уверены, что хотите удалить данную статью?"
                    routeName={route(
                        `admin.${namespace}.articles.destroy`,
                        selectedArticle,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}

type ArticleItemProps = {
    article: Article;
    onClick: () => void;
};

function ArticleItem({ article, onClick }: ArticleItemProps) {
    const { namespace = 'news' } = usePage<{
        namespace: string;
    }>().props;

    return (
        <div
            className={cn(
                'relative grid grid-cols-4 gap-2 text-center text-text-black md:justify-between',
            )}
        >
            <div className="">
                {article.thumbnail && (
                    <LazyImage
                        parentClass="max-w-25 mx-auto"
                        img={article.thumbnail.path}
                        tinyImg={article.thumbnail.tiny_path}
                        alt={article.thumbnail.alt}
                    />
                )}
            </div>
            <span className="pt-4 font-semibold">{article.title}</span>
            <span className="">{shortenDescription(article.description)}</span>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={route(`admin.${namespace}.articles.show`, article.id)}
                    className="ease cursor-pointer text-dark-green transition-colors duration-200 hover:text-light-swamp"
                    as="button"
                >
                    <PencilIcon className="size-6" />
                </Link>
                <TrashBtn
                    onClick={onClick}
                    size="size-7"
                />
            </div>
        </div>
    );
}
