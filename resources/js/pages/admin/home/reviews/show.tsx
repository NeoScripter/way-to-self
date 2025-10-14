import ReviewUpsert from '@/components/admin/molecules/review-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Review } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { review } = usePage<{
        review: Review;
    }>().props;

    return (
        <EditingLayout
            navKey="reviews"
            title="Редактировать отзыв"
            updatedAt={review.updated_at}
        >
            <ReviewUpsert
                review={review}
                routeName={route(`admin.home.reviews.update`, review.id)}
            />
        </EditingLayout>
    );
}

