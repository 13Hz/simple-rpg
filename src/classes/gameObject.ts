import {DrawContext} from "./drawContext";
import {Point} from "../types/point";
import {GameManager} from "../managers/gameManager";
import {TypedEvent} from "./typedEvent";
import {checkCollision} from "../utils/functions";

export class GameObject {
    public point: Point;
    public isAlive: boolean = true;
    public width: number;
    public height: number;
    public color: string;
    public isHover: boolean = false;

    onCollision: TypedEvent<GameObject> = new TypedEvent<GameObject>();

    constructor(point: Point, size: number = 10, color: string = 'red') {
        this.point = point;
        this.color = color;
        this.width = size;
        this.height = size;
    }

    public getCenter(): Point {
        return {
            x: this.point.x + this.width / 2,
            y: this.point.y + this.height / 2
        };
    }

    checkInRoom() {
        if (this.isAlive) {
            if ((this.point.x > DrawContext.getCanvas().width || this.point.x < 0)
                || (this.point.y > DrawContext.getCanvas().height || this.point.y < 0)) {
                this.isAlive = false;
            }
        }
    }

    update() {
        const cursorPoint = GameManager.cursorManager.point;
        this.isHover = (cursorPoint.x >= this.point.x && cursorPoint.x <= this.point.x + this.width) && (cursorPoint.y >= this.point.y && cursorPoint.y <= this.point.y + this.height);
        GameManager.getAllGameObject().forEach((object) => {
            if (object !== this && checkCollision(this, object)) {
                this.onCollision.emit(object);
            }
        });
    }

    draw() {
        DrawContext.draw((context) => {
            context.fillStyle = this.color;
            context.fillRect(this.point.x, this.point.y, this.width, this.height);
        });
    }
}