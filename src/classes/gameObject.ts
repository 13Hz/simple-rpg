import {DrawContext} from "./drawContext";

export class GameObject
{
    protected x: number;
    protected y: number;
    protected isAlive: boolean = true;
    private width: number = 10;
    private height: number = 10;
    private color: string;

    constructor(x: number, y: number, color: string = 'red')
    {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        const prevFillStyle = DrawContext.getContext().fillStyle;

        DrawContext.getContext().fillStyle = this.color;
        DrawContext.getContext().fillRect(this.x, this.y, this.width, this.height);
        DrawContext.getContext().fillStyle = prevFillStyle;
    }
}