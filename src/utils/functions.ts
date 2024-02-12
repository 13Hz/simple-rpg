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
    return (
        object1.point.x <= object2.point.x + object2.width &&
        object1.point.x + object1.width >= object2.point.x &&
        object1.point.y <= object2.point.y + object2.height &&
        object1.point.y + object1.height >= object2.point.y
    );
}

export function rnd(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}