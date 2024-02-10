import {GameObject} from "../classes/gameObject";

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

export function checkCollision(object1: GameObject, object2: GameObject): boolean {
    const w1 = object1.width / 2;
    const h1 = object1.height / 2;
    const w2 = object2.width / 2;
    const h2 = object2.height / 2;

    return (object1.point.x + w1 >= object2.point.x - w2 && object1.point.x - w1 <= object2.point.x + w2) && (object1.point.y + h1 >= object2.point.y - h2 && object1.point.y - h1 <= object2.point.y + h2);
}

export function rnd(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}