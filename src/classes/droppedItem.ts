import type {Item} from "./item";

export class DroppedItem {
    readonly item: Item;
    private _count: number;

    constructor(item: Item, count: number = 1) {
        this.item = item;
        this._count = count;
    }

    set count(count: number) {
        this._count = this.getMaxStackSize() != 0 && count > this.getMaxStackSize() ? this.getMaxStackSize() : count;
    }

    get count(): number {
        return this._count < 0 ? 0 : this._count;
    }

    isStackabe(): boolean  {
        return this.item.stackable;
    }

    getMaxStackSize(): number {
        return this.item.maxStackSize;
    }
}