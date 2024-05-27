import type {GameObject} from "../classes/gameObject";
import type {TypedEvent} from "../classes/typedEvent";
import {CreatureEffect} from "../classes/creatureEffects/creatureEffect";

export interface DamageDealer {
    damage: number;
    initiator: GameObject;
    isAlive: boolean;
    effects: CreatureEffect[];
    readonly onDealDamage: TypedEvent;
}