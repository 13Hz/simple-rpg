import {GameObject} from "./gameObject";
import {Point} from "../types/point";
import {IDamages} from "../types/iDamages";

export class Bullet extends GameObject implements IDamages{
    angle: number;
    speed: number;
    manaCost: number;
    damage: number;
    xVelocity: number;
    yVelocity: number;

    constructor(point: Point, angle: number, size: number) {
        super({
            x: point.x - size / 2,
            y: point.y - size / 2
        }, size);
        this.angle = angle;
        this.speed = 1;
        this.manaCost = 10;
        this.color = "red";
        this.damage = 10;
        this.xVelocity = this.speed * Math.cos(this.angle);
        this.yVelocity = this.speed * Math.sin(this.angle);
    }

    update() {
        super.update();
        this.checkInRoom();

        if (this.isAlive) {
            this.point.x += this.xVelocity;
            this.point.y += this.yVelocity;
        }
    }
}