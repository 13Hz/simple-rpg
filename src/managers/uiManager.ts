import {UiWindow} from "../classes/ui/uiWindow";
import {PocketWindow} from "../classes/ui/pocketWindow";

export class UiManager {
    private _pocketWindow: UiWindow;

    constructor() {
        this._pocketWindow = new PocketWindow();
    }

    openPocket() {
        this._pocketWindow.open();
    }
}