import UserLayout from '@/layouts/user/user-layout';

type PaymentProps = {
    heading: string;
    body: string;
};
export default function Payment({ heading, body }: PaymentProps) {
    return (
        <UserLayout
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto max-w-330">
                <h1 className="mt-10 text-center font-heading text-2xl font-medium text-balance text-text-black uppercase md:mt-20 md:text-5xl xl:mt-30 xl:text-6xl">
                    {heading}
                </h1>

                <div className="prose prose-sm mb-43 max-w-full prose-neutral md:prose-base md:mb-47 xl:prose-xl xl:mb-63">
                    {body}
                </div>
            </article>
        </UserLayout>
    );
}
