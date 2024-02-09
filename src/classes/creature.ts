import {GameObject} from "./gameObject";

export class Creature extends GameObject
{
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
}