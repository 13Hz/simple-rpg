import type {Point} from "../../classes/point";

export const OnMouseMoveEvent = 'onMouseMove';
export const OnMouseClickEvent = 'onMouseClick';

export interface OnMouseEventPayload {
    readonly point: Point;
}