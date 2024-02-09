import {Bullet} from "./bullet";
import {Point} from "../types/point";

export class IceBall extends Bullet {
    constructor(point: Point, angle: number, size: number) {
        super(point, angle, size);
        this.speed = 1;
        this.manaCost = 10;
        this.color = 'blue';
    }
}