import {GameObject} from "./gameObject";

export class Creature extends GameObject
{
    protected health: number = 100;
    protected maxHealth: number = 100;
    protected mana: number = 100;
    protected maxMana: number = 100;
    protected healthRegenerationRate: number = 0.01;
    protected manaRegenerationRate: number = 0.5;
    protected exp: number = 0;
    protected maxExp: number = 100;
    protected lvl: number = 1;

    protected isRunning: boolean = false;
    protected xVelocity: number = 0;
    protected yVelocity: number = 0;
    protected maxVelocity: number = 1;
    protected speed: number = 0.005;
}