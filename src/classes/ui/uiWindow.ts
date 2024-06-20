import {Point} from "../point";

export abstract class UiWindow {
    private readonly _id: string;
    private readonly _title: string;
    protected readonly _node?: HTMLElement;
    private _isMoved: boolean = false;
    private _point: Point = Point.empty;
    private _mouseStartPoint: Point = Point.empty;

    protected constructor(id: string, title: string, point?: Point) {
        this._id = id;
        this._title = title;
        if (point) {
            this._point = point;
        } else {
            this._point = new Point(200, 200);
        }

        const template: HTMLTemplateElement | null = document.querySelector('#window__template');
        if (template && template.content.firstElementChild) {
            const uiWindow = template.content.firstElementChild.cloneNode(true) as HTMLElement;
            const header = uiWindow.querySelector('.header') as HTMLDivElement;
            if (header) {
                const title = header.querySelector('.title') as HTMLElement;
                if (title) {
                    title.innerText = this._title;
                }
                header.addEventListener('mousedown', this.onMouseDown.bind(this));
                document.addEventListener('mouseup', this.onMouseUp.bind(this));
                document.addEventListener('mousemove', this.onMouseMove.bind(this));
                const closeButton = header.querySelector('.close__button');
                if (closeButton) {
                    closeButton.addEventListener('click', () => {
                        this._isMoved = false;
                        this.close();
                    });
                }
            }

            uiWindow.id = this._id;
            uiWindow.style.left = `${this._point.x}px`;
            uiWindow.style.top = `${this._point.y}px`;

            this._node = uiWindow;

            document.body.appendChild(uiWindow);
        }
    }

    private onMouseDown(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('close__button') || !this._node) {
            return;
        }

        this._isMoved = true;
        this._mouseStartPoint = new Point(event.clientX, event.clientY);
        const rect = this._node.getBoundingClientRect();
        this._point = new Point(rect.left, rect.top);

        event.preventDefault();
    }

    private onMouseMove(event: MouseEvent) {
        if (!this._isMoved || !this._node) {
            return;
        }

        const dx = event.clientX - this._mouseStartPoint.x;
        const dy = event.clientY - this._mouseStartPoint.y;

        this._node.style.left = `${this._point.x + dx}px`;
        this._node.style.top = `${this._point.y + dy}px`;
    }

    private onMouseUp() {
        this._isMoved = false;
    }

    open(): void {
        if (this._node) {
            this._node.classList.add('active');
        }
    }

    close(): void {
        if (this._node) {
            this._node.classList.remove('active');
        }
    }
}