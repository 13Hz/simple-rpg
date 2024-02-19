import type {Item} from "./item";
import {DroppedItem} from "./droppedItem";
import {calculateChance, rnd} from "../utils/functions";

export class DroppedItemChance {
    readonly item: Item;
    private readonly _chance: number = 0;
    private readonly _minCount: number = 0;
    private readonly _maxCount: number = 1;

    constructor(item: Item, chance: number, minCount: number = 0, maxCount: number = 1) {
        this.item = item;
        this._chance = chance;
        this._minCount = minCount;
        this._maxCount = maxCount;
    }

    calculate(): DroppedItem | null | undefined {
        if (calculateChance(this._chance)) {
            return new DroppedItem(this.item, rnd(this._minCount, this._maxCount));
        }

        return null;
    }
}