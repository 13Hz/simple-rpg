import {Creature} from "./creature";
import {Point} from "./point";
import {DrawManager} from "../managers/drawManager";
import {Ui} from "./ui";
import {GameManager} from "../managers/gameManager";
import type {DroppedItemChance} from "./droppedItemChance";

export abstract class Enemy extends Creature {
    private _spawnPoint: Point;
    private _target: Point | null;
    private _isTakeDamage: boolean = false;
    protected _name: string = 'Dummy';
    protected _health: number = this.lvl * 100;
    protected _maxHealth: number = this.lvl * 100;
    protected _healthRegenerationRate: number = 0.01;
    protected _speed: number = 0.003;
    protected _exp: number = 10;

    protected constructor(point: Point, target: Point | null = null, dropChances: DroppedItemChance[] = []) {
        super(point, 10, 'pink');
        this._spawnPoint = point;
        this._target = target;

        dropChances.forEach((dropChance) => {
            const item = dropChance.calculate();
            if (item) {
                this._inventoryItems.push(item);
            }
        });
        this.onTakeDamage.on('onTakeDamage', (data) => {
            if (data && data.damageObject) {
                this._target = data.damageObject.initiator.point;
            }
        });
        this.onCollision.on('onCollide', (data) => {
            if (data && data.collidedObject.isDamageDealer() && this.isAlive) {
                this.takeDamage(data.collidedObject);
                data.collidedObject.isAlive = false;
                this._target = data.collidedObject.initiator.point;
                this._isTakeDamage = true;
            }
        });
        this.mouseEvents.on('onMouseEnter', () => {
            if (!this.isAlive && this.hasInventoryItems()) {
                document.body.style.cursor = 'pointer';
            }
        });
        this.mouseEvents.on('onMouseLeave', () => {
            if (document.body.style.cursor == 'pointer') {
                document.body.style.cursor = 'default';
            }
        });
        this.mouseEvents.on('onObjectClick', (data) => {
            if (data && !this.isAlive && this.hasInventoryItems()) {
                GameManager.uiManager.openPocket(this);
            }
        });
        setInterval(() => {
            if (this.isAlive && !this._target) {
                this.moveToPoint(Point.random(GameManager.width, GameManager.height));
            }
        }, 1000);
    }

    update() {
        super.update();
        if (this.isAlive) {
            if (this._target) {
                this.moveToPoint(this._target);
            }

            this.point.x += this.xVelocity;
            this.point.y += this.yVelocity;
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
        if (((this.isHover || this._isTakeDamage) && this.isAlive) || (this.isHover && this.hasInventoryItems())) {
            DrawManager.draw((context) => {
                context.font = '12px';
                context.fillStyle = 'gray';
                context.fillText(this._name, this.getCenter().x - context.measureText(this._name).width / 2, this.point.y - 25);
                const levelText = `${this.lvl} lvl`;
                context.fillText(levelText, this.getCenter().x - context.measureText(levelText).width / 2, this.point.y - 15);
                if (this.isAlive) {
                    Ui.drawBar(this.getCenter().x - 20, this.point.y - 40, 40, 3, this.health, 0, this._maxHealth, 'red', 0, false);
                }
            });
        }
    }
}