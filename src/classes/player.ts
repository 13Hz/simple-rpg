import {Creature} from './creature';
import {BulletsManager} from "../managers/bulletsManager";
import {IceBall} from "./iceBall";
import {Point} from "../types/point";
import {Ui} from "./ui";

export class Player extends Creature implements IControlable, IUpdatable {
    public w: boolean = false;
    public a: boolean = false;
    public s: boolean = false;
    public d: boolean = false;

    public holding: boolean = false;
    public power: number = 1;
    public minPower: number = 1;
    public maxPower: number = 1;
    public baseDamage: number = 5;

    constructor(point: Point) {
        super(point, 10, 'white');
    }

    keyDown(e: KeyboardEvent): void {
        if (e.code === 'KeyD') {
            this.d = true;
        }
        if (e.code === 'KeyA') {
            this.a = true;
        }
        if (e.code === 'KeyW') {
            this.w = true;
        }
        if (e.code === 'KeyS') {
            this.s = true;
        }
    }

    keyUp(e: KeyboardEvent): void {
        if (e.code == 'KeyD') {
            this.d = false;
        }
        if (e.code == 'KeyA') {
            this.a = false;
        }
        if (e.code == 'KeyW') {
            this.w = false;
        }
        if (e.code == 'KeyS') {
            this.s = false;
        }
    }

    update() {
        if (this.isAlive) {
            if (this.d && this.xVelocity < this.maxVelocity)
                this.xVelocity += this.speed;
            else if (!this.d && this.xVelocity > 0)
                this.xVelocity -= this.speed;

            if (this.a && this.xVelocity > this.maxVelocity * -1)
                this.xVelocity -= this.speed;
            else if (!this.a && this.xVelocity < 0)
                this.xVelocity += this.speed;

            if (this.s && this.yVelocity < this.maxVelocity)
                this.yVelocity += this.speed;
            else if (!this.s && this.yVelocity > 0)
                this.yVelocity -= this.speed;

            if (this.w && this.yVelocity > this.maxVelocity * -1)
                this.yVelocity -= this.speed;
            else if (!this.w && this.yVelocity < 0)
                this.yVelocity += this.speed;

            if (!this.a && !this.w && !this.s && !this.d && (this.xVelocity < this.speed && this.xVelocity > -this.speed))
                this.xVelocity = 0;

            if (!this.a && !this.w && !this.s && !this.d && (this.yVelocity < this.speed && this.yVelocity > -this.speed))
                this.yVelocity = 0;

            this.point.x += this.xVelocity;
            this.point.y += this.yVelocity;

            if (this.health <= 0) {
                this.health = 0;
                this.isAlive = false;
            }

            this.isRunning = !(this.xVelocity == 0 && this.yVelocity == 0);
        }
    }

    regeneration() {
        if (this.health < this.maxHealth)
            this.health += this.isRunning ? this.healthRegenerationRate * 2 : this.healthRegenerationRate;
        else
            this.health = this.maxHealth;
        if (this.mana < this.maxMana)
            this.mana += this.isRunning ? this.manaRegenerationRate * 2 : this.manaRegenerationRate;
        else
            this.mana = this.maxMana;
    }

    shoot(rad: number, diff: number) {
        const bullet = new IceBall(this.getCenter(), rad, diff * 5);
        bullet.damage += this.baseDamage * this.lvl;
        bullet.damage *= this.power;
        bullet.manaCost *= this.power;

        if (this.isAlive && this.mana >= bullet.manaCost) {
            this.mana -= bullet.manaCost;
            BulletsManager.add(bullet);
        }
    }

    draw() {
        super.draw();
        Ui.draw();
    }
}