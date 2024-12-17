import {UiWindow} from "./uiWindow";
import {Point} from "../point";
import {GameManager} from "../../managers/gameManager";

export class InventoryWindow extends UiWindow {
    constructor(point?: Point) {
        super('inventory', 'Инвентарь', point);
    }

    show() {
        this.update();
        this.open();
    }

    update() {
        if (this._node) {
            const windowBody: HTMLElement | null = this._node.querySelector('.body');
            const bodyTemplate: HTMLTemplateElement | null = document.querySelector('#pocket_body__template');
            const itemTemplate: HTMLTemplateElement | null = document.querySelector('#item__template');
            if (itemTemplate && windowBody && bodyTemplate && bodyTemplate.content.firstElementChild) {
                const pocketBody = bodyTemplate.content.firstElementChild.cloneNode(true) as HTMLElement;
                const pocketBodyItems = pocketBody.querySelector('.items');
                if (pocketBodyItems) {
                    GameManager.player.inventoryItems.forEach((item) => {
                        if (itemTemplate.content.firstElementChild) {
                            const itemNode = itemTemplate.content.firstElementChild.cloneNode(true) as HTMLElement;
                            const itemIcon: HTMLElement = itemNode.querySelector('.icon') as HTMLElement;
                            if (itemIcon && item.item.icon) {
                                itemIcon.style.backgroundImage = `url(${item.item.icon})`;
                            }
                            const itemName = itemNode.querySelector('.name');
                            const itemCount = itemNode.querySelector('.count');
                            if (itemName && itemCount) {
                                itemName.textContent = item.item.name;
                                itemCount.textContent = item.count.toString();
                                itemNode.setAttribute('title', item.item.description);
                                pocketBodyItems.appendChild(itemNode);
                            }
                        }
                    });
                }
                windowBody.replaceChildren(pocketBody);
            }
        }
    }
}