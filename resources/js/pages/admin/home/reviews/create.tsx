import ReviewUpsert from '@/components/admin/molecules/review-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {

    return (
        <EditingLayout
            navKey="reviews"
            title="Написать отзыв"
        >
            <ReviewUpsert routeName={route(`admin.home.reviews.store`)} />
        </EditingLayout>
    );
}
