export class DrawManager {
    private static context: CanvasRenderingContext2D | null | undefined;
    private static canvas: HTMLCanvasElement | null;

    static getCanvas(): HTMLCanvasElement | null {
        const id: string = '#canvas';
        if (!this.canvas) {
            this.canvas = document.querySelector(id);
        }

        return this.canvas;
    }

    static getContext(): CanvasRenderingContext2D | null | undefined {
        if (!this.context) {
            this.context = this.getCanvas()?.getContext('2d');
        }

        return this.context;
    }

    static draw(callback: (context: CanvasRenderingContext2D) => void): void {
        const context = this.getContext();
        if (context) {
            const prevFillStyle = context.fillStyle;
            callback(context);
            context.fillStyle = prevFillStyle;
        }
    }

    static clear(): void {
        this.draw((context) => {
            context.fillStyle = '#000';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        });
    }
}