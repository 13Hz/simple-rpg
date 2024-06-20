import {UiWindow} from "./uiWindow";
import {Point} from "../point";
import {Creature} from "../creature";

export class PocketWindow extends UiWindow {
    constructor(point?: Point) {
        super('pocket', 'Содержимое трупа', point);
    }

    show(creature: Creature) {
        this.update(creature);
        this.open();
    }

    private update(creature: Creature) {
        if (this._node) {
            const windowBody: HTMLElement | null = this._node.querySelector('.body');
            const bodyTemplate: HTMLTemplateElement | null = document.querySelector('#pocket_body__template');
            const itemTemplate: HTMLTemplateElement | null = document.querySelector('#item__template');
            if (itemTemplate && windowBody && bodyTemplate && bodyTemplate.content.firstElementChild ) {
                const pocketBody = bodyTemplate.content.firstElementChild.cloneNode(true) as HTMLElement;
                const pocketBodyItems = pocketBody.querySelector('.items');
                if (pocketBodyItems) {
                    creature.droppedItems.forEach((item) => {
                        if (itemTemplate.content.firstElementChild) {
                            const itemNode = itemTemplate.content.firstElementChild.cloneNode(true) as HTMLElement;
                            const itemName = itemNode.querySelector('.name');
                            const itemCount = itemNode.querySelector('.count');
                            if (itemName && itemCount) {
                                itemName.textContent = item.item.name;
                                itemCount.textContent = item.count.toString();
                                itemNode.addEventListener('click', () => {
                                    creature.deleteDroppedItem(item);
                                    if (creature.hasDroppedItems()) {
                                        this.update(creature);
                                    } else {
                                        this.close();
                                    }
                                });
                                pocketBodyItems.appendChild(itemNode);
                            }
                        }
                    });
                }

                windowBody.replaceChildren(pocketBody);
            }
        }
    }

    private itemClick(event: MouseEvent): void {
        console.log((event.target as HTMLElement).closest('.item'));
    }
}