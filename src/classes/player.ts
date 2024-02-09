import {Creature} from './creature';
import {DrawContext} from './drawContext';

export class Player extends Creature implements IControlable, IUpdatable {
    w: boolean = false;
    a: boolean = false;
    s: boolean = false;
    d: boolean = false;

    holding: boolean = false;
    power: number = 1;
    minPower: number = 1;
    maxPower: number = 3;
    baseDamage: number = 5;

    constructor(x: number, y:number) {
        super(x, y, 'white');
    }

    keyDown(e: KeyboardEvent): void {
        if (e.code === 'KeyD') {
            this.d = true;
        }
        if (e.code === 'KeyA') {
            this.a = true;
        }
        if (e.code === 'KeyW') {
            this.w = true;
        }
        if (e.code === 'KeyS') {
            this.s = true;
        }
    }

    keyUp(e: KeyboardEvent): void {
        if (e.code == 'KeyD') {
            this.d = false;
        }
        if (e.code == 'KeyA') {
            this.a = false;
        }
        if (e.code == 'KeyW') {
            this.w = false;
        }
        if (e.code == 'KeyS') {
            this.s = false;
        }
    }

    update() {
        if (this.isAlive) {
            if (this.d && this.xVelocity < this.maxVelocity)
                this.xVelocity += this.speed;
            else if (!this.d && this.xVelocity > 0)
                this.xVelocity -= this.speed;

            if (this.a && this.xVelocity > this.maxVelocity * -1)
                this.xVelocity -= this.speed;
            else if (!this.a && this.xVelocity < 0)
                this.xVelocity += this.speed;

            if (this.s && this.yVelocity < this.maxVelocity)
                this.yVelocity += this.speed;
            else if (!this.s && this.yVelocity > 0)
                this.yVelocity -= this.speed;

            if (this.w && this.yVelocity > this.maxVelocity * -1)
                this.yVelocity -= this.speed;
            else if (!this.w && this.yVelocity < 0)
                this.yVelocity += this.speed;

            if (!this.a && !this.w && !this.s && !this.d && (this.xVelocity < this.speed && this.xVelocity > -this.speed))
                this.xVelocity = 0;

            if (!this.a && !this.w && !this.s && !this.d && (this.yVelocity < this.speed && this.yVelocity > -this.speed))
                this.yVelocity = 0;

            this.x += this.xVelocity;
            this.y += this.yVelocity;

            if (this.health <= 0) {
                this.health = 0;
                this.isAlive = false;
            }

            this.isRunning = !(this.xVelocity == 0 && this.yVelocity == 0);
        }
    }

    private drawUi(): void {
        const ctx = DrawContext.getContext();
        const canvas = DrawContext.getCanvas();
        const prevFillStyle = ctx.fillStyle;
        
        ctx.fillStyle = 'gray';
        ctx.fillRect(8, 8, 104, 14);

        ctx.fillStyle = 'red';
        ctx.fillRect(10,10, this.health * 100 / this.maxHealth, 10);

        ctx.font = '12px';
        ctx.fillStyle = 'white';
        ctx.fillText((this.health * 100 / this.maxHealth).toFixed(2) + '%', 45, 18);

        // MP BAR
        ctx.fillStyle = 'gray';
        ctx.fillRect(8, 28, 104, 14);

        ctx.fillStyle = 'blue';
        ctx.fillRect(10,30, this.mana * 100 / this.maxMana, 10);

        ctx.font = '12px';
        ctx.fillStyle = 'white';
        ctx.fillText((this.mana * 100 / this.maxMana).toFixed(2) + '%', 45, 38);
        //========

        // EXP BAR
        ctx.fillStyle = 'gray';
        ctx.fillRect(20, canvas.height - 10, canvas.width - 40, 5);

        ctx.fillStyle = 'yellow';
        ctx.fillRect(20, canvas.height - 10, this.exp * (canvas.width - 40) / this.maxExp, 5);

        ctx.font = '12px';
        ctx.fillStyle = 'white';
        ctx.fillText('LVL: ' + this.lvl, 20, canvas.height - 15);
        ctx.fillText((this.exp * 100 / this.maxExp).toFixed(2) + '%', canvas.width - 50, canvas.height - 15);

        //========

        // HOLDING BAR

        if(this.holding && this.power > this.minPower)
        {
            ctx.fillStyle = 'gray';
            ctx.fillRect(this.x - 20, this.y - 15, 40, 5);

            ctx.fillStyle = 'aqua';
            ctx.fillRect(this.x - 20, this.y - 15, (this.power - 1) * 40 / (this.maxPower + 1) * 2, 5);
        }

        ctx.fillStyle = prevFillStyle;
    }

    draw() {
        super.draw();
        this.drawUi();
    }
}