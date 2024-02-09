import {DrawContext} from "./drawContext";
import {Point} from "../types/point";

export class GameObject {
    public point: Point;
    public isAlive: boolean = true;
    public width: number;
    public height: number;
    public color: string;

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

    draw() {
        const prevFillStyle = DrawContext.getContext().fillStyle;

        DrawContext.getContext().fillStyle = this.color;
        DrawContext.getContext().fillRect(this.point.x, this.point.y, this.width, this.height);
        DrawContext.getContext().fillStyle = prevFillStyle;
    }
}