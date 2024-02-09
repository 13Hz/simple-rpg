import {Player} from "../classes/player";
import {CursorManager} from "./cursorManager";
import {BulletsManager} from "./bulletsManager";

export class GameManager {
    public static player: Player;
    public static cursorManager: CursorManager;
    public static bulletsManager: BulletsManager;
}