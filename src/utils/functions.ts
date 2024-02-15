export function map(
    value: number,
    fromMin: number,
    fromMax: number,
    toMin: number,
    toMax: number
): number {
    const percentage = (value - fromMin) / (fromMax - fromMin);
    return toMin + percentage * (toMax - toMin);
}

export function rnd(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}