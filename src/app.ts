import {Player} from "./classes/player";
import {DrawContext} from "./classes/drawContext";
import {CursorManager} from "./managers/cursorManager";
import {BulletsManager} from "./managers/bulletsManager";

declare global {
    interface Window {
        player: Player,
        cursorManager: CursorManager,
        bulletsManager: BulletsManager
    }
}

window.cursorManager = new CursorManager();
window.bulletsManager = new BulletsManager();
window.player = new Player({x: 100, y: 100});

const canvas = DrawContext.getCanvas();

document.addEventListener('keydown', (e) => window.player.keyDown(e));
document.addEventListener('keyup', (e) => window.player.keyUp(e));

function update(): void {
    if (window.player.holding) {
        mEnd = new Date();
        mDifference = (mEnd.getTime() - mStart!.getTime()) / 500;
        if (mDifference > mMax)
            mDifference = mMax;
        else if (mDifference < mMin)
            mDifference = mMin;

        window.player.power = mDifference;
    } else {
        window.player.power = window.player.minPower;
    }
    window.player.update();
    window.bulletsManager.update();
}

function draw(): void {
    clear();
    window.player.draw();
    window.bulletsManager.draw();
}

function clear(): void {
    const prevFillStyle = DrawContext.getContext().fillStyle;

    DrawContext.getContext().fillStyle = '#000';
    DrawContext.getContext().fillRect(0, 0, canvas.width, canvas.height);
    DrawContext.getContext().fillStyle = prevFillStyle;
}

let mStart: Date | null = null;
let mEnd: Date | null = null;
let mDifference: number = 0;
const mMax = 3;
const mMin = 1;

window.cursorManager.onMouseDown.on(() => {
    mStart = new Date();
    window.player.holding = true;
});

window.cursorManager.onMouseUp.on(() => {
    mEnd = new Date();
    mDifference = (mEnd.getTime() - mStart!.getTime()) / 500;
    if (mDifference > mMax)
        mDifference = mMax;
    else if (mDifference < mMin)
        mDifference = mMin;
    window.player.holding = false;
});

window.cursorManager.onClick.on((manager) => {
    const rad = Math.atan2(manager.point.y - window.player.getCenter().y, manager.point.x - window.player.getCenter().x);
    window.player.shoot(rad, mDifference);
});

setInterval(update, 1);
setInterval(draw, 1);
setInterval(() => window.player.regeneration(), 100);