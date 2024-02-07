import {Creature} from "./Creature.js";
import {checkCollision, getLogString} from "./Functions.js";

export class Enemy extends Creature
{	
	constructor(x, y)
	{
		super();
		
		this.x = x;
		this.y = y;
		
		this.hp = this.lvl * 100;
		this.maxHp = this.lvl * 100;
		this.hpReg = 0.01;
		this.speed = 0.003;
		this.exp = 10;
		this.spanwX = x;
		this.spawnY = y;
	}
	
	regen()
	{
		if(this.isRunning)
		{
			if(this.hp < this.maxHp)
				this.hp += this.hpReg;
			else
				this.hp = this.maxHp;
			if(this.mp < this.maxMp)
				this.mp += this.mpReg;
			else
				this.mp = this.maxMp;
		}
		else
		{
			if(this.hp < this.maxHp)
				this.hp += this.hpReg * 2;
			else
				this.hp = this.maxHp;
			if(this.mp < this.maxMp)
				this.mp += this.mpReg * 2;
			else
				this.mp = this.maxMp;

		}
	}
	
	takeDamage(bullet)
	{
		if(this.isAlive)
		{
			if(checkCollision(this, bullet) && !bullet.enemy)
			{
				this.showDamage = true;
				this.takeCritical = bullet.critical;
				this.showValue = bullet.damage;
				if(!this.onAttack)
					this.onAttack = true;
				this.hp -= bullet.damage;
				bullet.isAlive = false;
				if(this.hp <= 0)
				{
					this.hp = 0;
					this.isAlive = false;
					console.log(getLogString(this.name + " убит"));
					return true;
				}
				else
					return false;
			}
		}
	}
	
	update(player)
	{
		if(this.isAlive)
		{
			if(this.onAttack)
			{
				if(player.x > this.x && this.xVel < this.maxVel)
					this.xVel += this.speed;
				else if(player.x < this.x && this.xVel > 0)
					this.xVel -= this.speed;
					
				if(player.x < this.x && this.xVel > this.maxVel * -1)
					this.xVel -= this.speed;
				else if(player.x > this.x && this.xVel < 0)
					this.xVel += this.speed;
					
				if(player.y > this.y && this.yVel  < this.maxVel)
					this.yVel  += this.speed;
				else if(player.y < this.y && this.yVel  > 0)
					this.yVel  -= this.speed;
					
				if(player.y < this.y && this.yVel > this.maxVel * -1)
					this.yVel -= this.speed;
				else if(player.y > this.y && this.yVel < 0)
					this.yVel += this.speed;
			}
			else
			{
				if(new Date() - this.spawnDate - 2000 > 0)
				{
					for(var i = 0; i < Math.round(Math.random() * 30); i++)
						this.moveToPoint(Math.random() * 500, Math.random() * 500);
					this.spawnDate = new Date();
				}
			}
				
			var diff = this.lvl - player.lvl;
			var standartExp = player.maxExp / 100 * 10;
			if(diff > 0)
			{
				var exp = standartExp + (standartExp * diff) / 2;
				if(exp > player.maxExp / 3)
					exp = player.maxExp / 3;
				this.exp = exp;
			}
			else
			{
				var exp = standartExp + (standartExp * diff) / 5;
				if(exp > 0)
					this.exp = exp;
				else
					this.exp = 10;
			}
			this.x += this.xVel;
			this.y += this.yVel;
			
			if(this.hp <= 0)
			{
				this.hp = 0;
				this.isAlive = false;
			}
			
			if(this.xVel == 0 && this.yVel == 0)
			{
				this.isRunning = false;
			}
			else
			{
				this.isRunning = true;
			}
		}
	}
	
	move()
	{
		this.x += 15;
	}

	draw(ctx, player)
	{
		ctx.fillStyle = "pink";
		ctx.fillRect(this.x - this.width / 2,this.y - this.height / 2, this.width, this.height);
		this.drawInfo(ctx, player);
		
	}
	
}