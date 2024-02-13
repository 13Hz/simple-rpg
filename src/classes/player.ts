import {Creature} from './creature';
import {IceBall} from "./iceBall";
import {Point} from "../types/point";
import {Ui} from "./ui";
import {GameManager} from "../managers/gameManager";

export class Player extends Creature {
    private _w: boolean = false;
    private _a: boolean = false;
    private _s: boolean = false;
    private _d: boolean = false;

    private _holding: boolean = false;
    private _power: number = 1;
    private _minPower: number = 1;
    private _maxPower: number = 1;

    constructor(point: Point) {
        super(point, 10, 'white');
    }

    get power() {
        return this._power;
    }

    set power(power: number) {
        this._power = power;
    }

    get minPower() {
        return this._minPower;
    }

    set holding(holding: boolean) {
        this._holding = holding;
    }

    get holding() {
        return this._holding;
    }

    keyDown(e: KeyboardEvent): void {
        if (e.code === 'KeyD') {
            this._d = true;
        }
        if (e.code === 'KeyA') {
            this._a = true;
        }
        if (e.code === 'KeyW') {
            this._w = true;
        }
        if (e.code === 'KeyS') {
            this._s = true;
        }
    }

    keyUp(e: KeyboardEvent): void {
        if (e.code == 'KeyD') {
            this._d = false;
        }
        if (e.code == 'KeyA') {
            this._a = false;
        }
        if (e.code == 'KeyW') {
            this._w = false;
        }
        if (e.code == 'KeyS') {
            this._s = false;
        }
    }

    update() {
        super.update();
        if (this.isAlive) {
            if (this._d && this.xVelocity < this.maxVelocity)
                this.xVelocity += this.speed;
            else if (!this._d && this.xVelocity > 0)
                this.xVelocity -= this.speed;

            if (this._a && this.xVelocity > this.maxVelocity * -1)
                this.xVelocity -= this.speed;
            else if (!this._a && this.xVelocity < 0)
                this.xVelocity += this.speed;

            if (this._s && this.yVelocity < this.maxVelocity)
                this.yVelocity += this.speed;
            else if (!this._s && this.yVelocity > 0)
                this.yVelocity -= this.speed;

            if (this._w && this.yVelocity > this.maxVelocity * -1)
                this.yVelocity -= this.speed;
            else if (!this._w && this.yVelocity < 0)
                this.yVelocity += this.speed;

            if (!this._a && !this._w && !this._s && !this._d && (this.xVelocity < this.speed && this.xVelocity > -this.speed))
                this.xVelocity = 0;

            if (!this._a && !this._w && !this._s && !this._d && (this.yVelocity < this.speed && this.yVelocity > -this.speed))
                this.yVelocity = 0;

            this.point.x += this.xVelocity;
            this.point.y += this.yVelocity;
        }
    }

    shoot(rad: number, diff: number) {
        const bullet = new IceBall(this.getCenter(), rad, diff * 5, this, this._power * 10);
        bullet.damage *= this._power;

        if (this.isAlive && this._mana >= bullet.manaCost) {
            this._mana -= bullet.manaCost;
            GameManager.bulletsManager.add(bullet);
        }
    }

    draw() {
        super.draw();
        Ui.draw();
    }
}