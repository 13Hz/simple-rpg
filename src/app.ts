import './style.css';

import {DrawManager} from "./managers/drawManager";
import {Player} from "./classes/player";
import {Enemy} from "./classes/enemy";
import {GameManager} from "./managers/gameManager";

const canvas = DrawManager.getCanvas();
if (canvas) {
    canvas.width = GameManager.width;
    canvas.height = GameManager.height;

    GameManager.player = new Player({x: 100, y: 100});
    GameManager.enemiesManager.add(new Enemy({x: 400, y: 400}));

    document.addEventListener('keydown', (e) => GameManager.player.keyDown(e));
    document.addEventListener('keyup', (e) => GameManager.player.keyUp(e));

    GameManager.cursorManager.mouseEvents.on('onMouseClick', () => {
        GameManager.player.cast();
    });

    setInterval(GameManager.update, 1);
    setInterval(GameManager.draw, 1);
    setInterval(() => GameManager.player.regeneration(), 100);
}