import type {DamageDealer} from "../damageDealer";

export const OnTakeDamageEvent = 'onTakeDamage';

export interface OnTakeDamageEventPayload {
    readonly damageObject: DamageDealer;
}