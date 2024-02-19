import type {GameObject} from "../classes/gameObject";
import type {DroppedItem} from "../classes/droppedItem";

export class GameObjectsManager<T extends GameObject> {
    private objects: T[] = [];

    getObjects(): T[] {
        this.objects = this.objects.filter((object) => {
            const hasItems = 'droppedItems' in object && (object.droppedItems as Array<DroppedItem>).length;
            return hasItems || object.isAlive;
        });

        return this.objects;
    }

    add(object: T): void {
        this.objects.push(object);
    }

    update(): void {
        this.getObjects().forEach((object) => object.update());
    }

    draw(): void {
        this.getObjects().forEach((object) => object.draw());
    }
}