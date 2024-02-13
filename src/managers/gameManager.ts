import {Player} from "../classes/player";
import {CursorManager} from "./cursorManager";
import {GameObjectsManager} from "./gameObjectsManager";
import {GameObject} from "../classes/gameObject";

export class GameManager {
    static player: Player;
    static cursorManager: CursorManager = new CursorManager();
    static spellsManager: GameObjectsManager = new GameObjectsManager();
    static enemiesManager: GameObjectsManager = new GameObjectsManager();

    static getAllGameObject(): GameObject[] {
        return [(this.player as GameObject), ...this.enemiesManager.getObjects(), ...this.spellsManager.getObjects()];
    }
}