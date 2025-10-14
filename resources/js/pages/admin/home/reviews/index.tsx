import TrashBtn from '@/components/admin/atoms/trash-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import LazyImage from '@/components/user/atoms/lazy-image';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Review } from '@/types/model';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { homeMenuItems } from '../home-menu-items';

export default function Index() {
    const { reviews, count } = usePage<{
        reviews: PaginationMeta<Review>;
        count: number;
        namespace: string;
    }>().props;

    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const badge = pluralizeRu(count, 'отзыва', 'отзыва', 'отзывов');

    return (
        <AdminLayout topMenuItems={homeMenuItems}>
            <TableHeader
                only={['reviews']}
                label={'все отзывы'}
                badge={`${count} ${badge}`}
                createRoute={route(`admin.home.reviews.create`)}
            />
            <Table
                meta={reviews}
                width="min-w-120 sm:min-w-150 lg:min-w-200 space-y-8"
                columns={['Фото', 'Имя', '']}
                isEmpty={reviews.data.length === 0}
                columnClass="!text-center"
            >
                {reviews.data.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        onClick={() => setSelectedReview(review)}
                    />
                ))}
            </Table>

            {selectedReview != null && (
                <ConfirmationDialog
                    show={selectedReview != null}
                    closeDialog={() => setSelectedReview(null)}
                    title="Вы точно уверены, что хотите удалить данный отзыв?"
                    routeName={route(
                        `admin.home.reviews.destroy`,
                        selectedReview,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}

type ReviewItemProps = {
    review: Review;
    onClick: () => void;
};

function ReviewItem({ review, onClick }: ReviewItemProps) {
    return (
        <div
            className={cn(
                'relative grid grid-cols-3 gap-2 text-center text-text-black md:justify-between',
            )}
        >
            <Link
                href={route(`admin.home.reviews.show`, review.id)}
                className="transition-scale block cursor-pointer duration-200 hover:scale-105"
                as="button"
            >
                {review.image && (
                    <LazyImage
                        parentClass="max-w-25 mx-auto"
                        img={review.image.path}
                        tinyImg={review.image.tiny_path}
                        alt={review.image.alt}
                    />
                )}
            </Link>

            <span className="pt-4 font-semibold">{review.author}</span>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={route(`admin.home.reviews.show`, review.id)}
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
