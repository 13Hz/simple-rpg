import {rnd} from "../utils/functions";

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static get empty() {
        return new Point(0, 0);
    }

    static random(width: number, height: number) {
        return new Point(rnd(0, width), rnd(0, height));
    }
}