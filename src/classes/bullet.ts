import {GameObject} from "./gameObject";
import {Point} from "../types/point";

export class Bullet extends GameObject implements IUpdatable
{
    angle: number;
    size: number;
    speed: number;
    manaCost: number;
    damage: number;

    constructor(point: Point, angle: number, size: number)
    {
        super(point);
        this.angle = angle;
        this.size = size;
        this.speed = 1;
        this.manaCost = 10;
        this.color = "red";
        this.width = 5 * this.size;
        this.height = 5 * this.size;
        this.damage = 10;
    }

    update()
    {
        if(this.isAlive)
        {
            this.point.x += this.speed * Math.cos(this.angle);
            this.point.y += this.speed * Math.sin(this.angle);
        }
    }
}