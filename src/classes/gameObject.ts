import {DrawManager} from "../managers/drawManager";
import {Point} from "./point";
import {GameManager} from "../managers/gameManager";
import {TypedEvent} from "./typedEvent";
import {DamageDealer} from "../types/damageDealer";

export class GameObject {
    private _point: Point;
    private _isAlive: boolean = true;
    private readonly _width: number;
    private readonly _height: number;
    private _color: string;
    private _isHover: boolean = false;

    public readonly onCollision: TypedEvent = new TypedEvent();
    public readonly mouseEvents: TypedEvent = new TypedEvent();

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

    setCenter(point: Point) {
        this._point = new Point(point.x - this._width / 2, point.y - this._height / 2);
    }

    getCenter(): Point {
        return new Point(this._point.x + this._width / 2, this._point.y + this._height / 2);
    }

    checkInRoom() {
        const canvas = DrawManager.getCanvas();
        if (this._isAlive && canvas) {
            if ((this._point.x > canvas.width || this._point.x < 0)
                || (this._point.y > canvas.height || this._point.y < 0)) {
                this._isAlive = false;
            }
        }
    }

    isDamageDealer(): this is DamageDealer {
        return 'damage' in this;
    }

    update() {
        const cursorPoint = GameManager.cursorManager.point;
        const isHover = (cursorPoint.x >= this._point.x && cursorPoint.x <= this._point.x + this._width) && (cursorPoint.y >= this._point.y && cursorPoint.y <= this._point.y + this._height);
        if (!this._isHover && isHover) {
            GameManager.cursorManager.hoveredObject = this;
            this.mouseEvents.emit('onMouseEnter', {point: cursorPoint});
        }
        if (this._isHover && !isHover) {
            GameManager.cursorManager.hoveredObject = null;
            this.mouseEvents.emit('onMouseLeave', {point: cursorPoint});
        }
        this._isHover = isHover;

        GameManager.getAllGameObject().forEach((object) => {
            if (object && object !== this && this.checkCollision(object)) {
                this.onCollision.emit('onCollide', {
                    currentObject: this,
                    collidedObject: object
                });
            }
        });
    }

    checkCollision(object: GameObject): boolean {
        return (
            this.point.x <= object.point.x + object.width &&
            this.point.x + this.width >= object.point.x &&
            this.point.y <= object.point.y + object.height &&
            this.point.y + this.height >= object.point.y
        );
    }

    draw() {
        DrawManager.draw((context) => {
            context.fillStyle = this._color;
            context.fillRect(this._point.x, this._point.y, this._width, this._height);
        });
    }
}