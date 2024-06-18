import {Point} from "../classes/point";
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

export function rnd(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function calculateChance(chance: number): boolean {
    return rnd(0, 100) < chance;
}

export function isPointInObject(point: Point, object: GameObject): boolean {
    const { x: px, y: py } = point;
    const { point: objPoint, width, height } = object;
    const { x: ox, y: oy } = objPoint;

    const withinX = px >= ox && px <= (ox + width);
    const withinY = py >= oy && py <= (oy + height);

    return withinX && withinY;
}