import {Player} from "./classes/player";
import {DrawContext} from "./classes/drawContext";

declare global {
    interface Window {
        player: Player
    }
}

const canvas = DrawContext.getCanvas();

window.player = new Player(120, 100);

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
}

function draw(): void {
    clear();
    window.player.draw();
}

function clear(): void {
    const prevFillStyle = DrawContext.getContext().fillStyle;

    DrawContext.getContext().fillStyle = '#000';
    DrawContext.getContext().fillRect(0, 0, canvas.width, canvas.height);
    DrawContext.getContext().fillStyle = prevFillStyle;
}

canvas.onmousedown = function (e) {
    mStart = new Date();
    window.player.holding = true;
}

let mStart: Date | null = null;
let mEnd: Date | null = null;
let mDifference: number = 0;
const mMax = 3;
const mMin = 1;

canvas.onmouseup = function (e) {
    mEnd = new Date();
    mDifference = (mEnd.getTime() - mStart!.getTime()) / 500;
    if (mDifference > mMax)
        mDifference = mMax;
    else if (mDifference < mMin)
        mDifference = mMin;
    window.player.holding = false;
}

setInterval(update, 1);
setInterval(draw, 1);