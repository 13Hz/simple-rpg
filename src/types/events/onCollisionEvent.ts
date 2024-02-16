import type {GameObject} from "../../classes/gameObject";

export const OnCollisionEvent = 'onCollide';

export interface OnCollisionEventPayload {
    readonly currentObject: GameObject;
    readonly collidedObject: GameObject;
}