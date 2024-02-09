import {GameObject} from "../classes/gameObject";

export class GameObjectsManager {
    private objects: GameObject[] = [];

    public getObjects(): GameObject[] {
        this.objects = this.objects.filter((object) => object.isAlive);

        return this.objects;
    }

    public add(object: GameObject): void {
        this.objects.push(object);
    }

    public update(): void {
        this.getObjects().forEach((object) => object.update());
    }

    public draw(): void {
        this.getObjects().forEach((object) => object.draw());
    }
}