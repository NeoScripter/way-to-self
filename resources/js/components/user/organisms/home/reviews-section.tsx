
const breakpoints: BreakpointConfig[] = [
    { screen: 640, values: { slide: 220, gap: 10 } },
    { screen: 768, values: { slide: 367, gap: 17 } },
    { screen: Infinity, values: { slide: 331, gap: 15 } },
];

export default function Slider() {
    const { currentCity } = useCityContext();
    const { data: carwashes, isLoading, isError } = useCarwashes(currentCity.name);

    const {
        slides: carouselSlides,
        offsetPx,
        handleTouchStart,
        handleTouchEnd,
        handleIncrement,
        handleDecrement,
        shouldAnimate,
        animationDuration,
    } = useCarousel({
        slides: carwashes && !isError ? [...carwashes, ...carwashes] : [],
        offset: 3,
        animationDuration: 500,
        breakpoints: breakpoints,
    });


    if (isError || !carwashes?.length)
        return (
            <div className="text-white primary-px primary-py">
                Произошла ошибка, попробуйте позже
            </div>
        );

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="-mx-5 sm:-mx-12.5 xl:-mx-25">
                    <div className="relative overflow-x-clip px-1">
                        <div
                            className={cn(
                                'flex gap-[10px] sm:gap-[17px] xl:gap-[15px]'
                            )}
                        >
                            <CarouselSkeleton />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="-mx-5 sm:-mx-12.5 xl:-mx-25">
                    <div
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        className="relative overflow-x-clip px-1 py-1"
                    >
                        <div
                            className={cn(
                                'flex gap-[10px] sm:gap-[17px] xl:gap-[15px]',
                                shouldAnimate && 'transition-transform ease-in-out'
                            )}
                            style={{
                                transform: `translateX(-${offsetPx}px)`,
                                transitionDuration: shouldAnimate
                                    ? `${animationDuration}ms`
                                    : '0ms',
                            }}
                        >
                            {carouselSlides.map(
                                (carwash: FetchedCarwash | null, index) =>
                                    carwash != null ? (
                                        <CarwashCard
                                            key={`carswash-${index}`}
                                            imgPath={carwash.img}
                                            rating={carwash.rating}
                                            name={carwash.name}
                                            address={carwash.location}
                                            description={carwash.description}
                                            price={carwash.price}
                                            url={carwash.url}
                                        />
                                    ) : null
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <section className="primary-px primary-py">
            <div className="text-btn-bg text-[0.5rem] sm:text-[0.625rem] mb-4 sm:mb-6">
                [ Предлагаем только лучшие объекты ]
            </div>
            <div className="xl:flex xl:items-end xl:justify-between mb-4.5 sm:mb-6 xl:mb-7">
                <h2 className="uppercase text-2xl sm:text-4xl text-balance block mb-4 sm:mb-5 xl:max-w-1/2 xl:mb-0">
                    ВЫБЕРИТЕ ОПТИМАЛЬНУЮ{' '}
                    <span className="text-btn-bg">АВТОМОЙКУ И ШИНОМОНТАЖ</span>
                </h2>

                <div className="flex items-center gap-1">
                    <CarouselBtn onClick={handleDecrement}>
                        <ChevronLeftIcon />
                    </CarouselBtn>
                    <CarouselBtn onClick={handleIncrement}>
                        <ChevronRightIcon />
                    </CarouselBtn>
                </div>
            </div>

            {/*  h-91.25 sm:h-129.75 xl:h-117.25 */}
            {renderContent()}

            <PrimaryBtn route='/search' className="gap-2 mx-auto mt-5 sm:mt-9 xl:mt-12">
                <MagnifyingGlassIcon className="size-5" />
                Найти мойку
            </PrimaryBtn>
        </section>
    );
}
