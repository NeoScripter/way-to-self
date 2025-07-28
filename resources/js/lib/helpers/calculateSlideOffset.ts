
export default function calculateSlideOffset(windowSize: number) {
    const breakpoints = [
        { max: 768, width: 300, gap: 16 },
        { max: 1024, width: 672, gap: 32 },
        { max: 1536, width: 964, gap: 32 },
        { max: Infinity, width: 1170, gap: 40 }
    ];

    const config = breakpoints.find(bp => windowSize < bp.max) || breakpoints[breakpoints.length - 1];
    return config.width + config.gap;
}
