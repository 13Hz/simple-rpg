import {Bullet} from "./bullet";
import {Point} from "../types/point";
import {GameObject} from "./gameObject";

export class IceBall extends Bullet {
    constructor(point: Point, angle: number, size: number, initiator: GameObject) {
        super(point, angle, size, initiator);
        this.speed = 1;
        this.manaCost = 10;
        this.color = 'blue';
    }
}