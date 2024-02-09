import {DrawContext} from "./drawContext";
import {Point} from "../types/point";

export class GameObject {
    public point: Point;
    public isAlive: boolean = true;
    public width: number = 10;
    public height: number = 10;
    public color: string;

    constructor(point: Point, color: string = 'red') {
        this.point = point;
        this.color = color;
    }

    public getCenter(): Point {
        return {
            x: this.point.x + this.width / 2,
            y: this.point.y + this.height / 2
        };
    }

    checkInRoom() {
        if (this.isAlive) {
            if ((this.point.x > DrawContext.getCanvas().width || this.point.x < 0) || (this.point.y > DrawContext.getCanvas().height || this.point.y < 0))
                this.isAlive = false;
        }
    }

    draw() {
        const prevFillStyle = DrawContext.getContext().fillStyle;

        DrawContext.getContext().fillStyle = this.color;
        DrawContext.getContext().fillRect(this.point.x, this.point.y, this.width, this.height);
        DrawContext.getContext().fillStyle = prevFillStyle;
    }
}