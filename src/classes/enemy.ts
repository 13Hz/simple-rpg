import {Creature} from "./creature";
import {Point} from "../types/point";
import {DrawContext} from "./drawContext";
import {Ui} from "./ui";
import {GameObject} from "./gameObject";
import {Bullet} from "./bullet";

export class Enemy extends Creature {
    spawnPoint: Point
    target: Point | null;
    name: string = 'Dummy';
    isTakeDamage: boolean = false;

    constructor(point: Point, target: Point | null = null) {
        super(point, 10, 'pink');
        this.health = this.lvl * 100;
        this.maxHealth = this.lvl * 100;
        this.healthRegenerationRate = 0.01;
        this.speed = 0.003;
        this.exp = 10;
        this.spawnPoint = point;
        this.target = target;
        
        this.onTakeDamage.on((initiator: Creature) => {
            this.target = initiator.point;
        });

        this.onCollision.on((object: GameObject) => {
            if (object instanceof Bullet) {
                this.takeDamage(object);
                object.isAlive = false;
                this.target = object.initiator.point;
                this.isTakeDamage = true;
            }
        });

        setInterval(() => {
            if (this.isAlive && !this.target) {
                this.moveToPoint({
                    x: Math.random() * 500,
                    y: Math.random() * 500
                });
            }
        }, 1000);
    }

    update() {
        super.update();
        if (this.isAlive) {
            if (this.target) {
                this.moveToPoint(this.target);
            }

            this.point.x += this.xVelocity;
            this.point.y += this.yVelocity;

            this.isRunning = !(this.xVelocity == 0 && this.yVelocity == 0);
        }
    }

    moveToPoint(target: Point) {
        if (target.x > this.point.x && this.xVelocity < this.maxVelocity)
            this.xVelocity += this.speed;
        else if (target.x < this.point.x && this.xVelocity > 0)
            this.xVelocity -= this.speed;

        if (target.x < this.point.x && this.xVelocity > this.maxVelocity * -1)
            this.xVelocity -= this.speed;
        else if (target.x > this.point.x && this.xVelocity < 0)
            this.xVelocity += this.speed;

        if (target.y > this.point.y && this.yVelocity < this.maxVelocity)
            this.yVelocity += this.speed;
        else if (target.y < this.point.y && this.yVelocity > 0)
            this.yVelocity -= this.speed;

        if (target.y < this.point.y && this.yVelocity > this.maxVelocity * -1)
            this.yVelocity -= this.speed;
        else if (target.y > this.point.y && this.yVelocity < 0)
            this.yVelocity += this.speed;
    }

    draw() {
        super.draw();
        if (this.isHover || this.isTakeDamage) {
            DrawContext.draw((context) => {
                context.font = '12px';
                context.fillStyle = 'gray';
                context.fillText(this.name, this.getCenter().x - context.measureText(this.name).width / 2, this.point.y - 25);
                const levelText = `${this.lvl} lvl`;
                context.fillText(levelText, this.getCenter().x - context.measureText(levelText).width / 2, this.point.y - 15);
                Ui.drawBar(this.getCenter().x - 20, this.point.y - 40, 40, 3, this.health, 0, this.maxHealth, 'red', 0, false);
            });
        }
    }
}