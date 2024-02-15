import type {GameObject} from "../classes/gameObject";

export class GameObjectsManager {
    private objects: GameObject[] = [];

    getObjects(): GameObject[] {
        this.objects = this.objects.filter((object) => object.isAlive);

        return this.objects;
    }

    add(object: GameObject): void {
        this.objects.push(object);
    }

    update(): void {
        this.getObjects().forEach((object) => object.update());
    }

    draw(): void {
        this.getObjects().forEach((object) => object.draw());
    }
}