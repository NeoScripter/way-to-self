import QueryFeedback from '@/components/user/atoms/query-feedback';

export default function ErrorFallback() {
    return (
        <div
            role="alert"
            className="my-4 sm:my-8"
        >
            <QueryFeedback status="error" />
        </div>
    );
}
