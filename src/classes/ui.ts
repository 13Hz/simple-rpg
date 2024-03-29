import {DrawManager} from "../managers/drawManager";
import {map} from "../utils/functions";
import {GameManager} from "../managers/gameManager";

export class Ui {
    private static context: CanvasRenderingContext2D | null | undefined = DrawManager.getContext();
    private static canvas: HTMLCanvasElement | null = DrawManager.getCanvas();

    public static drawBar(x: number, y: number, width: number, height: number, value: number, minValue: number, maxValue: number, color: string, padding: number = 2, drawText: boolean = true, drawOnChange = false): void {
        if (drawOnChange && value == minValue || !this.context) {
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
        if (this.context && this.canvas) {
            this.drawBar(10, this.canvas.height - 10, this.canvas.width - 20, 5, GameManager.player.exp, 0, GameManager.player.maxExp, 'yellow', 0, false);
            this.context.font = '12px';
            this.context.fillStyle = 'white';
            this.context.fillText('LVL: ' + GameManager.player.lvl, 10, this.canvas.height - 15);
            this.context.fillText((GameManager.player.exp * 100 / GameManager.player.maxExp).toFixed(2) + '%', this.canvas.width - 45, this.canvas.height - 15);
        }
    }

    public static draw(): void {
        DrawManager.draw(() => {
            this.drawBar(5, 5, 100, 15, GameManager.player.health, 0, GameManager.player.maxHealth, 'red');
            this.drawBar(5, 25, 100, 15, GameManager.player.mana, 0, GameManager.player.maxMana, 'blue');
            this.drawBar(GameManager.player.point.x - 15, GameManager.player.point.y - 10, GameManager.player.width + 30, 5, GameManager.player.power, 1, 3, 'aqua', 0, false, true);
            this.drawExpBar();
        });
    }
}