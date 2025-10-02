export const convertPolarToCartesian = (
    angle: number,
    distance: number,
): [number, number] => {
    const angleInRadians = convertDegreesToRadians(angle);

    const x = Math.cos(angleInRadians) * distance;
    const y = Math.sin(angleInRadians) * distance;

    return [x, y];
};

const convertDegreesToRadians = (angle: number): number =>
    (angle * Math.PI) / 180;
