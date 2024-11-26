import {PocketWindow} from "../classes/ui/pocketWindow";
import {Creature} from "../classes/creature";
import {InventoryWindow} from "../classes/ui/inventoryWindow";

export class UiManager {
    private _pocketWindow: PocketWindow;
    private _inventoryWindow: InventoryWindow;

    constructor() {
        this._pocketWindow = new PocketWindow();
        this._inventoryWindow = new InventoryWindow();
    }

    openPocket(creature: Creature) {
        this._pocketWindow.show(creature);
    }

    openInventory() {
        this._inventoryWindow.show();
    }

    updateInventory() {
        this._inventoryWindow.update();
    }
}