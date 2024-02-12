import './style.css';

import {Player} from "./classes/player";
import {DrawContext} from "./classes/drawContext";
import {GameManager} from "./managers/gameManager";
import {Enemy} from "./classes/enemy";

GameManager.player = new Player({x: 100, y: 100});

const canvas = DrawContext.getCanvas();
GameManager.enemiesManager.add(new Enemy({x: 400, y: 400}));
document.addEventListener('keydown', (e) => GameManager.player.keyDown(e));
document.addEventListener('keyup', (e) => GameManager.player.keyUp(e));

function update(): void {
    if (GameManager.player.holding) {
        mEnd = new Date();
        mDifference = (mEnd.getTime() - mStart!.getTime()) / 500;
        if (mDifference > mMax)
            mDifference = mMax;
        else if (mDifference < mMin)
            mDifference = mMin;

        GameManager.player.power = mDifference;
    } else {
        GameManager.player.power = GameManager.player.minPower;
    }
    GameManager.player.update();
    GameManager.bulletsManager.update();
    GameManager.enemiesManager.update();
}

function draw(): void {
    clear();
    GameManager.player.draw();
    GameManager.bulletsManager.draw();
    GameManager.enemiesManager.draw();
}

function clear(): void {
    if (canvas) {
        DrawContext.draw((context) => {
            context.fillStyle = '#000';
            context.fillRect(0, 0, canvas.width, canvas.height);
        });
    }
}

let mStart: Date | null = null;
let mEnd: Date | null = null;
let mDifference: number = 0;
const mMax = 3;
const mMin = 1;

GameManager.cursorManager.onMouseDown.on(() => {
    mStart = new Date();
    GameManager.player.holding = true;
});

GameManager.cursorManager.onMouseUp.on(() => {
    mEnd = new Date();
    mDifference = (mEnd.getTime() - mStart!.getTime()) / 500;
    if (mDifference > mMax)
        mDifference = mMax;
    else if (mDifference < mMin)
        mDifference = mMin;
    GameManager.player.holding = false;
});

GameManager.cursorManager.onClick.on((manager) => {
    const rad = Math.atan2(manager.point.y - GameManager.player.getCenter().y, manager.point.x - GameManager.player.getCenter().x);
    GameManager.player.shoot(rad, mDifference);
});

setInterval(update, 1);
setInterval(draw, 1);
setInterval(() => GameManager.player.regeneration(), 100);