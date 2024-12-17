export enum Rarity {
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary
}

export interface Item {
    readonly name: string;
    readonly description: string;
    readonly icon?: URL;
    readonly rarity: Rarity;
    readonly cost: number;
    readonly stackable: boolean;
    readonly maxStackSize: number;
}