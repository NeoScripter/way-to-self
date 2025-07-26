
export default function calculateSlideOffset(windowSize: number) {
    let slideWidth = 0;
    let slideGap = 0;

    if (windowSize < 768) {
        slideWidth = 300;
        slideGap = 16;
    } else if (windowSize < 1024 && windowSize > 768) {
        slideGap = 32;
        slideWidth = 672;
    } else if (windowSize > 1024 && windowSize < 1536) {
        slideWidth = 964;
        slideGap = 32;
    } else if (windowSize > 1536) {
        slideWidth = 1170;
        slideGap = 40;
    }

    return slideWidth + slideGap;
}
