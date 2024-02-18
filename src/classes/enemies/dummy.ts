import {Enemy} from "../enemy";
import {DroppedItemChanse} from "../droppedItemChanse";
import {Items} from "../items/items";
import {Point} from "../point";

export class Dummy extends Enemy {
    protected _name: string = 'Dummy';
    protected _health: number = 20;
    protected _maxHealth: number = 20;

    constructor(point: Point, target: Point | null = null) {
        super(point, target, [
            new DroppedItemChanse(Items.Gold, 50, 1, 20)
        ]);
    }
}