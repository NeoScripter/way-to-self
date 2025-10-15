export default function ItemsGrid({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ul
            className="relative z-11 mb-17 grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] gap-11 md:mx-auto md:max-w-200 2xl:max-w-full"
            role="list"
        >
            {children}
        </ul>
    );
}
