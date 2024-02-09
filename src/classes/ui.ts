import {DrawContext} from "./drawContext";
import {map} from "../utils/functions";

export class Ui {
    private static context: CanvasRenderingContext2D = DrawContext.getContext();
    private static canvas: HTMLCanvasElement = DrawContext.getCanvas();

    private static drawBar(x: number, y: number, width: number, height: number, value: number, minValue: number, maxValue: number, color: string, padding: number = 2, drawText: boolean = true, drawOnChange = false): void {
        if (drawOnChange && value == minValue) {
            return;
        }

        this.context.fillStyle = 'gray';
        this.context.fillRect(x, y, width, height);

        this.context.fillStyle = color;
        this.context.fillRect(
            x + padding,
            y + padding,
            map(value, minValue, maxValue, 0, width - padding * 2),
            height - padding * 2
        );

        if (drawText) {
            this.context.font = '12px';
            this.context.fillStyle = 'white';
            const text = (value * 100 / maxValue).toFixed(2) + '%';
            const textMetrics = this.context.measureText(text);
            const textWidth = textMetrics.width;
            const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
            this.context.fillText(text, x + width / 2 - textWidth / 2, y + height / 2 + textHeight / 2);
        }
    }

    private static drawExpBar(): void {
        this.drawBar(10, this.canvas.height - 10, this.canvas.width - 20, 5, window.player.exp, 0, window.player.maxExp, 'yellow', 0, false);
        this.context.font = '12px';
        this.context.fillStyle = 'white';
        this.context.fillText('LVL: ' + window.player.lvl, 10, this.canvas.height - 15);
        this.context.fillText((window.player.exp * 100 / window.player.maxExp).toFixed(2) + '%', this.canvas.width - 45, this.canvas.height - 15);
    }

    public static draw(): void {
        const prevFillStyle = this.context.fillStyle;

        this.drawBar(5, 5, 100, 15, window.player.health, 0, window.player.maxHealth, 'red');
        this.drawBar(5, 25, 100, 15, window.player.mana, 0, window.player.maxMana, 'blue');
        this.drawBar(window.player.point.x - 15, window.player.point.y - 10, window.player.width + 30, 5, window.player.power, 1, 3, 'aqua', 0, false, true);
        this.drawExpBar();

        this.context.fillStyle = prevFillStyle;
    }
}