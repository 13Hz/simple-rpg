export class DrawContext {
    private static context: CanvasRenderingContext2D;
    private static canvas: HTMLCanvasElement;

    static getCanvas(): HTMLCanvasElement {
        const id: string = '#canvas';
        if (!this.canvas) {
            this.canvas = document.querySelector(id)!;
        }

        return this.canvas;
    }

    static getContext(): CanvasRenderingContext2D {
        if (!this.context) {
            this.context = this.getCanvas().getContext('2d')!;
        }

        return this.context;
    }
}