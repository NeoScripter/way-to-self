const MINUTES_IN_HOUR = 60;

export function roundDuration(time: number) {
    return time > MINUTES_IN_HOUR
        ? (Math.round(time / (MINUTES_IN_HOUR / 2)) / 2) + " ч."
        : time + " мин.";
}
