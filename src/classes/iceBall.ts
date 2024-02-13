import {Bullet} from "./bullet";
import {Point} from "../types/point";
import {GameObject} from "./gameObject";

export class IceBall extends Bullet {
    protected _speed: number = 1;
    protected _manaCost: number = 10;

    constructor(point: Point, angle: number, size: number, initiator: GameObject, manaCost: number) {
        super(point, angle, size, initiator, 'blue');
        this._manaCost = manaCost;
    }
}