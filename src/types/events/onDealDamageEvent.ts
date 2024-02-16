import type {DamageDealer} from "../damageDealer";

export const OnDealDamageEvent = 'onDealDamage';

export interface OnDealDamageEventPayload {
    readonly damageObject: DamageDealer;
}