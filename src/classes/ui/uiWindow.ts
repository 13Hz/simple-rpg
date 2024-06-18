import {Point} from "../point";
import {GameManager} from "../../managers/gameManager";

export abstract class UiWindow {
    private _id: string;
    private _point: Point;
    private _node?: Element;
    private _isMoved: boolean = false;
    private _offsetX: number = 0;
    private _offsetY: number = 0;

    constructor(id: string, point?: Point) {
        this._id = id;
        if (point) {
            this._point = point;
        } else {
            this._point = new Point(200, 200);
        }

        const template: Element | null = document.querySelector('#window__template');
        if (template) {
            const uiWindow = template.content.firstElementChild.cloneNode(true);
            const header = uiWindow.querySelector('.header');
            if (header) {
                header.addEventListener('mousedown', (event: MouseEvent) => {
                    if (event.target == header) {
                        this._isMoved = true;
                        this._offsetX = event.offsetX;
                        this._offsetY = event.offsetY;
                    }
                });
                header.addEventListener('mouseup', () => {
                    this._isMoved = false;
                });
                GameManager.cursorManager.mouseEvents.on('onMouseMove', (data) => {
                    if (data && this._isMoved) {
                        uiWindow.style.left = `${data.point.x - this._offsetX}px`;
                        uiWindow.style.top = `${data.point.y - this._offsetY}px`;
                    }
                });
                const closeButton = header.querySelector('.close__button');
                if (closeButton) {
                    closeButton.addEventListener('click', () => {
                        this._isMoved = false;
                        this.close();
                    });
                }
            }
            uiWindow.id = id;
            uiWindow.style.left = `${this._point.x}px`;
            uiWindow.style.top = `${this._point.y}px`;

            this._node = uiWindow;

            document.body.appendChild(uiWindow);
        }
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