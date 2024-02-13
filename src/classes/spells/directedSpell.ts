import {Point} from "../point";
import {Creature} from "../creature";
import {GameObject} from "../gameObject";
import {GameManager} from "../../managers/gameManager";
import {Spell} from "../../types/spell";
import {isDamageDealer} from "../../utils/functions";

export abstract class DirectedSpell extends GameObject implements Spell<Point> {
    manaCost: number = 10;
    protected _speed: number = 1;
    private _xVelocity: number = 0;
    private _yVelocity: number = 0;
    private _angle: number = 0;

    update() {
        super.update();
        this.checkInRoom();

        if (this.isAlive) {
            this.point.x += this._xVelocity;
            this.point.y += this._yVelocity;
        }
    }

    cast(target: Point): void {
        // bullet.damage *= this._power;
        if (this.isAlive && isDamageDealer(this) && this.initiator instanceof Creature && this.initiator.mana >= this.manaCost) {
            this.setCenter(this.initiator.getCenter());
            this._angle = Math.atan2(target.y - this.getCenter().y, target.x - this.getCenter().x);
            this._xVelocity = this._speed * Math.cos(this._angle);
            this._yVelocity = this._speed * Math.sin(this._angle);
            this.initiator.mana -= this.manaCost;
            GameManager.spellsManager.add(Object.create(this));
        }
    }
}