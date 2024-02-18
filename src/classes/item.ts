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
    readonly rarity: Rarity;
    readonly cost: number;
}