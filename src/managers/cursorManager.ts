import {Point} from "../types/point";
import {DrawContext} from "../classes/drawContext";
import {TypedEvent} from "../classes/typedEvent";

export class CursorManager {
    private _point: Point = {x: 0, y: 0};

    public readonly onMouseMove: TypedEvent<CursorManager> = new TypedEvent<CursorManager>();
    public readonly onClick: TypedEvent<CursorManager> = new TypedEvent<CursorManager>();
    public readonly onMouseDown: TypedEvent<CursorManager> = new TypedEvent<CursorManager>();
    public readonly onMouseUp: TypedEvent<CursorManager> = new TypedEvent<CursorManager>();

    constructor() {
        const canvas = DrawContext.getCanvas();
        if (canvas) {
            canvas.onmousemove = (e) => {
                this._point.x = e.x;
                this._point.y = e.y;
                this.onMouseMove.emit(this);
            };
            canvas.onclick = () => {
                this.onClick.emit(this);
            };
            canvas.onmousedown = () => {
                this.onMouseDown.emit(this);
            };
            canvas.onmouseup = () => {
                this.onMouseUp.emit(this);
            };
        }
    }

    get point() {
        return this._point;
    }
}