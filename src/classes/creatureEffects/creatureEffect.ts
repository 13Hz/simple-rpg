import {Creature} from "../creature";

export abstract class CreatureEffect {
    private readonly chance: number;

    protected constructor(chance: number) {
        this.chance = chance;
    }

    public getChance(): number {
        return this.chance;
    }

    public abstract update(owner: Creature): void

    public abstract draw(owner: Creature): void
}