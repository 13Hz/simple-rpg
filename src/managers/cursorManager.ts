import {Point} from "../classes/point";
import {DrawManager} from "./drawManager";
import {TypedEvent} from "../classes/typedEvent";

export class CursorManager {
    private _point: Point = Point.empty;

    public readonly mouseEvents: TypedEvent = new TypedEvent();

    constructor() {
        const canvas = DrawManager.getCanvas();
        if (canvas) {
            canvas.onmousemove = (e) => {
                this._point.x = e.x;
                this._point.y = e.y;
                this.mouseEvents.emit('onMouseMove', {
                    point: this._point
                });
            };
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
}