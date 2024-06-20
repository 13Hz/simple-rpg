import type {Point} from "../../classes/point";
import {GameObject} from "../../classes/gameObject";

export const OnMouseMoveEvent = 'onMouseMove';
export const OnMouseClickEvent = 'onMouseClick';
export const OnMouseEnterEvent = 'onMouseEnter';
export const OnMouseLeaveEvent = 'onMouseLeave';
export const OnObjectClickEvent = 'onObjectClick';

export interface OnMouseEventPayload {
    readonly point: Point;
}

export interface OnObjectClickEventPayload {
    readonly point: Point;
    readonly object: GameObject;
}