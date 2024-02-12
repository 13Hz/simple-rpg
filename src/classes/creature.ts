import {GameObject} from "./gameObject";
import {TypedEvent} from "./typedEvent";
import {Bullet} from "./bullet";
import {DrawContext} from "./drawContext";

export class Creature extends GameObject {
    health: number = 100;
    maxHealth: number = 100;
    mana: number = 100;
    maxMana: number = 100;
    healthRegenerationRate: number = 0.01;
    manaRegenerationRate: number = 0.5;
    exp: number = 0;
    maxExp: number = 100;
    lvl: number = 1;
    criticalChance: number = 5;
    criticalDamageMultiply: number = 3;

    isRunning: boolean = false;
    xVelocity: number = 0;
    yVelocity: number = 0;
    maxVelocity: number = 1;
    speed: number = 0.005;

    showDamage: boolean = false;
    damageValue: number = 0;
    damageFramesCount: number = 0;
    isCritical: boolean = false;

    onTakeDamage: TypedEvent<Creature> = new TypedEvent<Creature>();

    regeneration() {
        if (this.health < this.maxHealth)
            this.health += this.isRunning ? this.healthRegenerationRate : this.healthRegenerationRate * 2;
        else
            this.health = this.maxHealth;
        if (this.mana < this.maxMana)
            this.mana += this.isRunning ? this.manaRegenerationRate : this.manaRegenerationRate * 2;
        else
            this.mana = this.maxMana;
    }

    draw() {
        super.draw();
        if (this.showDamage) {
            DrawContext.draw((context) => {
                context.fillStyle = this.isCritical ? 'red' : 'white';
                context.fillText(`-${this.damageValue}`, this.point.x + this.width + 15, this.point.y - 10);
            });

            this.damageFramesCount++;
        }

        if(this.showDamage && this.damageFramesCount >= 500) {
            this.damageFramesCount = 0;
            this.showDamage = false;
            this.isCritical = false;
        }
    }

    takeDamage(by: Bullet, isCritical: boolean = false): boolean {
        if (this.isAlive && by.isAlive) {
            this.health -= by.damage;
            this.onTakeDamage.emit(this);

            this.showDamage = true;
            this.isCritical = isCritical;
            this.damageValue = by.damage;
            this.damageFramesCount = 0;

            if (this.health <= 0) {
                this.health = 0;
                this.isAlive = false;

                return true;
            }
        }

        return false;
    }
}