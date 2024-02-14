import {Player} from "../classes/player";
import {CursorManager} from "./cursorManager";
import {GameObjectsManager} from "./gameObjectsManager";
import {GameObject} from "../classes/gameObject";
import {DrawManager} from "./drawManager";
import {Enemy} from "../classes/enemy";

export class GameManager {
    static width: number = 600;
    static height: number = 600;
    static player: Player;
    static cursorManager: CursorManager = new CursorManager();
    static spellsManager: GameObjectsManager = new GameObjectsManager();
    static enemiesManager: GameObjectsManager = new GameObjectsManager();

    static getAllGameObject(): GameObject[] {
        return [(this.player as GameObject), ...this.enemiesManager.getObjects(), ...this.spellsManager.getObjects()];
    }

    static draw(): void {
        DrawManager.clear();
        GameManager.getAllGameObject().forEach((object) => {
            object.draw();
        });
    }

    static update(): void {
        GameManager.getAllGameObject().forEach((object) => {
            object.update();
        });
    }

    static initialize(): void {
        const canvas = DrawManager.getCanvas();
        if (canvas) {
            canvas.width = this.width;
            canvas.height = this.height;

            this.player = new Player({x: 100, y: 100});
            this.enemiesManager.add(new Enemy({x: 400, y: 400}));

            document.addEventListener('keydown', (e) => this.player.keyDown(e));
            document.addEventListener('keyup', (e) => this.player.keyUp(e));

            this.cursorManager.onClick.on(() => {
                this.player.cast();
            });

            setInterval(this.update, 1);
            setInterval(this.draw, 1);
            setInterval(() => this.player.regeneration(), 100);
        }
    }
}