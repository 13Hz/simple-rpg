import {GameObject} from "./gameObject";
import {TypedEvent} from "./typedEvent";
import {DrawManager} from "../managers/drawManager";
import {rnd} from "../utils/functions";
import {DamageDealer} from "../types/damageDealer";
import {CreatureEffect} from "./creatureEffects/creatureEffect";

export class Creature extends GameObject {
    protected _health: number = 100;
    protected _maxHealth: number = 100;
    protected _mana: number = 100;
    protected _maxMana: number = 100;
    protected _healthRegenerationRate: number = 0.01;
    protected _manaRegenerationRate: number = 0.5;
    protected _exp: number = 0;
    protected _maxExp: number = 100;
    private _lvl: number = 1;
    private _criticalChance: number = 5;
    private _criticalDamageMultiply: number = 2;

    private _xVelocity: number = 0;
    private _yVelocity: number = 0;
    protected _maxVelocity: number = 1;
    protected _speed: number = 0.005;

    private _showDamage: boolean = false;
    private _damageValue: number = 0;
    private _damageFramesCount: number = 0;
    private _isCritical: boolean = false;
    private _effects: CreatureEffect[] = [];

    readonly onTakeDamage: TypedEvent = new TypedEvent();

    get healthRegenerationRate() {
        return this.isRunning ? this._healthRegenerationRate : this._healthRegenerationRate * 2;
    }

    get manaRegenerationRate() {
        return this.isRunning ? this._manaRegenerationRate : this._manaRegenerationRate * 2;
    }

    get criticalChance() {
        //TODO: Вычислять из характерситик
        return this._criticalChance;
    }

    get mana() {
        return this._mana;
    }

    set mana(mana: number) {
        this._mana = mana;
    }

    get maxMana() {
        return this._maxMana;
    }

    get exp() {
        return this._exp;
    }

    get maxExp() {
        return this._maxExp;
    }

    get criticalDamageMultiply() {
        return this._criticalDamageMultiply;
    }

    get health() {
        return this._health;
    }

    get maxHealth() {
        return this._maxHealth;
    }

    get lvl() {
        return this._lvl;
    }

    get speed() {
        return this._speed;
    }

    get maxVelocity() {
        return this._maxVelocity;
    }

    get xVelocity() {
        return this._xVelocity;
    }

    set xVelocity(xVelocity: number) {
        this._xVelocity = xVelocity;
    }

    get yVelocity() {
        return this._yVelocity;
    }

    set yVelocity(yVelocity: number) {
        this._yVelocity = yVelocity;
    }

    get isRunning(): boolean {
        return this.isAlive && !(this.xVelocity == 0 && this.yVelocity == 0);
    }

    get baseDamage(): number {
        //TODO: Автовычисляемое поле на основе характеристик сущности
        return 10;
    }

    regeneration() {
        if (this._health < this._maxHealth)
            this._health += this.healthRegenerationRate;
        else if (this._health != this._maxHealth)
            this._health = this._maxHealth;
        if (this._mana < this._maxMana)
            this._mana += this.manaRegenerationRate;
        else if (this._mana != this._maxMana)
            this._mana = this._maxMana;
    }

    update() {
        super.update();
        this._effects.forEach((effect) => {
            effect.update(this);
        });
        if (this.health <= 0) {
            this.isAlive = false;
        }
    }

    draw() {
        super.draw();
        this._effects.forEach((effect) => {
            effect.draw(this);
        });
        if (this._showDamage) {
            DrawManager.draw((context) => {
                context.fillStyle = this._isCritical ? 'red' : 'white';
                context.fillText(`-${this._damageValue}`, this.point.x + this.width + 15, this.point.y - 10);
            });

            this._damageFramesCount++;
        }

        if (this._showDamage && this._damageFramesCount >= 500) {
            this._damageFramesCount = 0;
            this._showDamage = false;
            this._isCritical = false;
        }
    }

    takeDamage(by: DamageDealer): boolean {
        if (this.isAlive && by.isAlive) {
            by.onDealDamage.emit('onDealDamage', {
                damageObject: by
            });
            let damage = by.damage;
            if (by.initiator instanceof Creature) {
                this._isCritical = rnd(0, 100) < by.initiator.criticalChance;
                damage *= this._isCritical ? by.initiator.criticalDamageMultiply : 1;
            }

            this._health -= damage;

            this.onTakeDamage.emit('onTakeDamage', {
                damageObject: by
            });

            this._showDamage = true;
            this._damageValue = damage;
            this._damageFramesCount = 0;

            if (this._health <= 0) {
                this._health = 0;
                this.isAlive = false;
            } else {
                by.effects.forEach((dealEffect) => {
                    if (rnd(0, 100) < dealEffect.getChance()) {
                        this._effects.push(dealEffect);
                    }
                });
            }

            return true;
        }

        return false;
    }

    forceTakeDamage(damage: number): boolean {
        if (this.isAlive) {
            this._health -= damage;
            this.onTakeDamage.emit('onTakeDamage', {
                damage: damage
            });

            if (this._health <= 0) {
                this._health = 0;
                this.isAlive = false;
            }

            return true;
        }

        return false;
    }
}