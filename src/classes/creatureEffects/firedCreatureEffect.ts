import { Creature } from "../creature";
import {CreatureEffect} from "./creatureEffect";
import {rnd} from "../../utils/functions";
import {Flame} from "../particles/flame";

export class FiredCreatureEffect extends CreatureEffect {
    private _damageFramesCount: number = 0;
    private readonly _damagePerFrames: number = 100;
    private _flamesFramesCount: number = 0;
    private readonly _flamePerFrames: number = 50;
    private readonly _damage: number;
    private readonly _flameSizeSpeed: number = 0.015;
    private _flames: Flame[] = [];
    private readonly _startTime: number;

    constructor(damage: number, chance: number, actionTime: number) {
        super(chance, actionTime);
        this._damage = damage;
        this._startTime = Date.now();
    }

    public update(owner: Creature): void {
        if (this.isActive()) {
            const elapsedTime = Date.now() - this._startTime;
            if (elapsedTime / 1000 >= this.getActionTime()!) {
                this.deactivate();
            }
            if (this._damageFramesCount >= this._damagePerFrames) {
                owner.forceTakeDamage(this._damage);
                this._damageFramesCount = 0;
            }
            if (this._flamesFramesCount >= this._flamePerFrames) {
                for (let i = 0; i < rnd(0, 3); i++) {
                    this.addFlame(owner);
                }
                this._flamesFramesCount = 0;
            }

            this._damageFramesCount++;
            this._flamesFramesCount++;
            this._flames = this._flames.filter(i => i.isAlive);
            this._flames.forEach((flame) => {
                flame.size -= this._flameSizeSpeed;
                if (flame.size <= 0) {
                    flame.isAlive = false;
                }
            });
        }
    }

    private addFlame(owner: Creature): void {
        const pointX = rnd(owner.point.x - 5, owner.point.x + owner.width + 5);
        const pointY = rnd(owner.point.y - 5, owner.point.y + owner.width + 5);
        const size = rnd(2, 6);

        this._flames.push(new Flame({x: pointX, y: pointY}, size));
    }

    public draw(): void {
        if (this.isActive()) {
            this._flames.forEach((flame) => flame.draw());
        }
    }
}