import {GameObject} from "../classes/gameObject";
import {TypedEvent} from "../classes/typedEvent";

export interface DamageDealer {
    damage: number;
    initiator: GameObject;
    isAlive: boolean;
    readonly onDealDamage: TypedEvent<GameObject>;
}