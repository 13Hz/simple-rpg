import {PocketWindow} from "../classes/ui/pocketWindow";
import {Creature} from "../classes/creature";

export class UiManager {
    private _pocketWindow: PocketWindow;

    constructor() {
        this._pocketWindow = new PocketWindow();
    }

    openPocket(creature: Creature) {
        this._pocketWindow.show(creature);
    }
}