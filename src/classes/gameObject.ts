import {DrawContext} from "./drawContext";
import {Point} from "../types/point";
import {GameManager} from "../managers/gameManager";
import {TypedEvent} from "./typedEvent";
import {checkCollision} from "../utils/functions";

export class GameObject {
    private _point: Point;
    private _isAlive: boolean = true;
    private readonly _width: number;
    private readonly _height: number;
    private _color: string;
    private _isHover: boolean = false;

    public readonly onCollision: TypedEvent<GameObject> = new TypedEvent<GameObject>();

    constructor(point: Point, size: number = 10, color: string = 'red') {
        this._point = point;
        this._color = color;
        this._width = size;
        this._height = size;
    }

    get isHover() {
        return this._isHover;
    }

    get point() {
        return this._point;
    }

    set point(point: Point) {
        this._point = point;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get isAlive() {
        return this._isAlive;
    }

    set isAlive(isAlive: boolean) {
        this._isAlive = isAlive;
    }

    set color(color: string) {
        this._color = color;
    }

    getCenter(): Point {
        return {
            x: this._point.x + this._width / 2,
            y: this._point.y + this._height / 2
        };
    }

    checkInRoom() {
        const canvas = DrawContext.getCanvas();
        if (this._isAlive && canvas) {
            if ((this._point.x > canvas.width || this._point.x < 0)
                || (this._point.y > canvas.height || this._point.y < 0)) {
                this._isAlive = false;
            }
        }
    }

    update() {
        const cursorPoint = GameManager.cursorManager.point;
        this._isHover = (cursorPoint.x >= this._point.x && cursorPoint.x <= this._point.x + this._width) && (cursorPoint.y >= this._point.y && cursorPoint.y <= this._point.y + this._height);
        GameManager.getAllGameObject().forEach((object) => {
            if (object && object !== this && checkCollision(this, object)) {
                this.onCollision.emit(object);
            }
        });
    }

    draw() {
        DrawContext.draw((context) => {
            context.fillStyle = this._color;
            context.fillRect(this._point.x, this._point.y, this._width, this._height);
        });
    }
}