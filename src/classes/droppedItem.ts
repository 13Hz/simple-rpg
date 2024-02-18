import {Item} from "./item";

export class DroppedItem {
    readonly item: Item;
    private readonly _count: number;

    constructor(item: Item, count: number = 1) {
        this.item = item;
        this._count = count;
    }

    get count(): number {
        return this._count < 0 ? 0 : this._count;
    }
}