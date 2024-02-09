import {Bullet} from "../classes/bullet";

export class BulletsManager {
    private static bullets: Bullet[] = [];

    public static getBullets(): Bullet[] {
        this.bullets = this.bullets.filter((bullet) => bullet.isAlive);

        return this.bullets;
    }

    public static add(bullet: Bullet): void {
        this.bullets.push(bullet);
    }

    public update(): void {
        BulletsManager.getBullets().forEach((bullet) => bullet.update());
    }

    public draw(): void {
        BulletsManager.getBullets().forEach((bullet) => bullet.draw());
    }
}