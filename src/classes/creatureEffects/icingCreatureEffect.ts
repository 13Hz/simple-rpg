import { Creature } from "../creature";
import {CreatureEffect} from "./creatureEffect";

export class IcingCreatureEffect extends CreatureEffect {
    private readonly _startTime: number;
    private readonly _speedMultiple: number;
    private _tempColor?: string;
    private _tempSpeed?: number;

    constructor(speedMultiple: number, chance: number, actionTime: number) {
        super(chance, actionTime);
        this._speedMultiple = speedMultiple;
        this._startTime = Date.now();
    }

    public update(owner: Creature): void {
        if (this.isActive()) {
            const elapsedTime = Date.now() - this._startTime;
            if (elapsedTime / 1000 >= this.getActionTime()!) {
                this.deactivate();
                owner.setColor(this._tempColor);
                owner.setSpeed(this._tempSpeed);
            }
        }
    }

    public draw(): void { }

    public applyEffect(owner: Creature): void {
        this._tempColor = owner.color;
        this._tempSpeed = owner.speed;
        owner.setColor('blue');
        owner.setSpeed(this._tempSpeed / this._speedMultiple);
    }
}