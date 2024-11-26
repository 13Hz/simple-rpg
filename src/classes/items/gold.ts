import {Item, Rarity} from "../item";

export class Gold implements Item {
    readonly cost: number = 1;
    readonly description: string = 'Основная валюта. Используется в обменах и торговле.';
    readonly name: string = 'Золото';
    readonly rarity: Rarity = Rarity.Common;
    readonly stackable: boolean = true;
    readonly maxStackSize: number = 0;
}