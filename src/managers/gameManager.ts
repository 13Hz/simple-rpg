import type {Player} from "../classes/player";
import {CursorManager} from "./cursorManager";
import {GameObjectsManager} from "./gameObjectsManager";
import type {GameObject} from "../classes/gameObject";
import {DrawManager} from "./drawManager";
import type {Enemy} from "../classes/enemy";
import type {DirectedSpell} from "../classes/spells/directedSpell";
import {UiManager} from "./uiManager";

export class GameManager {
    static width: number = 600;
    static height: number = 600;
    static player: Player;
    static cursorManager: CursorManager = new CursorManager();
    static spellsManager: GameObjectsManager<DirectedSpell> = new GameObjectsManager();
    static enemiesManager: GameObjectsManager<Enemy> = new GameObjectsManager();
    private static _uiManager?: UiManager;

    static get uiManager(): UiManager {
        if (!this._uiManager) {
            this._uiManager = new UiManager();
        }

        return this._uiManager;
    }

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
}