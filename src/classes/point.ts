import {rnd} from "../utils/functions";
import {GameManager} from "../managers/gameManager";

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

    static get random() {
        return new Point(rnd(0, GameManager.width), rnd(0, GameManager.height));
    }
}