import {GameObject} from "./gameObject";
import {Point} from "../types/point";
import {IDamages} from "../types/iDamages";

export class Bullet extends GameObject implements IDamages{
    damage: number = 10;
    protected _angle: number;
    protected _speed: number = 1;
    protected _manaCost: number = 10;
    private readonly _xVelocity: number;
    private readonly _yVelocity: number;
    private readonly _initiator: GameObject;

    constructor(point: Point, angle: number, size: number, initiator: GameObject, color: string = 'blue') {
        super({
            x: point.x - size / 2,
            y: point.y - size / 2
        }, size, color);
        this._angle = angle;
        this._xVelocity = this._speed * Math.cos(this._angle);
        this._yVelocity = this._speed * Math.sin(this._angle);
        this._initiator = initiator;
    }

    get initiator() {
        return this._initiator;
    }

    get manaCost() {
        return this._manaCost;
    }

    update() {
        super.update();
        this.checkInRoom();

        if (this.isAlive) {
            this.point.x += this._xVelocity;
            this.point.y += this._yVelocity;
        }
    }
}