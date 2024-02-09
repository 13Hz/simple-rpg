import {GameObject} from "./gameObject";
import {TypedEvent} from "./typedEvent";
import {Bullet} from "./bullet";

export class Creature extends GameObject {
    public health: number = 100;
    public maxHealth: number = 100;
    public mana: number = 100;
    public maxMana: number = 100;
    public healthRegenerationRate: number = 0.01;
    public manaRegenerationRate: number = 0.5;
    public exp: number = 0;
    public maxExp: number = 100;
    public lvl: number = 1;

    protected isRunning: boolean = false;
    protected xVelocity: number = 0;
    protected yVelocity: number = 0;
    protected maxVelocity: number = 1;
    protected speed: number = 0.005;

    onTakeDamage: TypedEvent<Creature> = new TypedEvent<Creature>();

    regeneration() {
        if (this.health < this.maxHealth)
            this.health += this.isRunning ? this.healthRegenerationRate * 2 : this.healthRegenerationRate;
        else
            this.health = this.maxHealth;
        if (this.mana < this.maxMana)
            this.mana += this.isRunning ? this.manaRegenerationRate * 2 : this.manaRegenerationRate;
        else
            this.mana = this.maxMana;
    }

    takeDamage(by: Bullet): boolean {
        if (this.isAlive && by.isAlive) {
            // if (checkCollision(this, bullet) && !bullet.enemy) {
            //     this.showDamage = true;
            //     this.takeCritical = bullet.critical;
            //     this.showValue = bullet.damage;
            //     if (!this.onAttack)
            //         this.onAttack = true;
            this.health -= by.damage;
            this.onTakeDamage.emit(this);
            // by.isAlive = false;
            if (this.health <= 0) {
                this.health = 0;
                this.isAlive = false;
                // console.log(getLogString(this.name + " убит"));
                return true;
            }
            // }
        }

        return false;
    }
}