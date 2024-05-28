import {Creature} from "../creature";

export abstract class CreatureEffect {
    private readonly _chance: number;
    private readonly _actionTime?: number;
    private _isActive: boolean = true;

    protected constructor(chance: number, actionTime?: number) {
        this._chance = chance;
        this._actionTime = actionTime;
    }

    public getChance(): number {
        return this._chance;
    }

    public isActive(): boolean {
        return this._isActive;
    }

    public deactivate() {
        this._isActive = false;
    }

    public getActionTime() {
        return this._actionTime;
    }

    public abstract update(owner: Creature): void

    public abstract draw(owner: Creature): void
}