import type {Point} from "../../classes/point";

export const OnMouseMoveEvent = 'onMouseMove';
export const OnMouseClickEvent = 'onMouseClick';
export const OnMouseEnterEvent = 'onMouseEnter';
export const OnMouseLeaveEvent = 'onMouseLeave';

export interface OnMouseEventPayload {
    readonly point: Point;
}