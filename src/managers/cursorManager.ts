import {Point} from "../classes/point";
import {DrawManager} from "./drawManager";
import {TypedEvent} from "../classes/typedEvent";
import type {GameObject} from "../classes/gameObject";

export class CursorManager {
    private _point: Point = Point.empty;
    private _hoveredObject: GameObject | undefined | null;
    public readonly mouseEvents: TypedEvent = new TypedEvent();

    constructor() {
        document.onmousemove = (e) => {
            this._point.x = e.x;
            this._point.y = e.y;
            this.mouseEvents.emit('onMouseMove', {
                point: this._point
            });
        };
        const canvas = DrawManager.getCanvas();
        if (canvas) {
            canvas.onclick = () => {
                this.mouseEvents.emit('onMouseClick', {
                    point: this._point
                });
            };
        }
    }

    get point() {
        return this._point;
    }

    get hoveredObject() {
        return this._hoveredObject;
    }

    set hoveredObject(obj) {
        this._hoveredObject = obj;
    }
}