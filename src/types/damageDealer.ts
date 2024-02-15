import type {GameObject} from "../classes/gameObject";
import type {TypedEvent} from "../classes/typedEvent";

export interface DamageDealer {
    damage: number;
    initiator: GameObject;
    isAlive: boolean;
    readonly onDealDamage: TypedEvent<GameObject>;
}