import {Player} from "../classes/player";
import {CursorManager} from "./cursorManager";
import {GameObjectsManager} from "./gameObjectsManager";
import {GameObject} from "../classes/gameObject";

export class GameManager {
    public static player: Player;
    public static cursorManager: CursorManager = new CursorManager();
    public static bulletsManager: GameObjectsManager = new GameObjectsManager();
    public static enemiesManager: GameObjectsManager = new GameObjectsManager();

    static getAllGameObject(): GameObject[] {
        return [(this.player as GameObject), ...this.enemiesManager.getObjects(), ...this.bulletsManager.getObjects()];
    }
}