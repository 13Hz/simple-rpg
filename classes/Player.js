import {Creature} from "./Creature.js";
import {IceBall} from "./IceBall.js";
import {rnd} from "./Functions.js";
import {FireBall} from "./FireBall.js";

export class Player extends Creature
{	
	constructor()
	{
		super();
		
		this.name = "Player";
		
		this.x = 300;
		this.y = 300;
		
		this.power = 1;
		this.minPower = 1;
		this.maxPower = 3;
		this.baseDamage = 5;
		
		this.maxSpeed = 0.015;
		
		this.holding = false;
		
		this.d = false;
		this.a = false;
		this.w = false;
		this.s = false;
		
		this.shift = false;
		
		this.showMenu = false;

		//характеристики
		this.str = 1;
		this.dex = 1;
		this.sta = 1;
		this.int = 1;
		this.luc = 1;

		this.criticalChanse = 5;
		this.maxCriticalChanse = 60;
		this.criticalDamageMultiply = 3;

		this.cp = 0;
		
		this.abuseMode = false;
		
		this.itemsIdCounter = 0;
		//
	}
	
	keyDown(e)
	{
		if(e.code == "Space" && this.isAlive)
			this.exp += 100;
		if(e.code == "KeyD")
		{
			this.d = true;
		}
		if(e.code == "KeyA")
		{
			this.a = true;
		}
		if(e.code == "KeyW")
		{
			this.w = true;
		}
		if(e.code == "KeyS")
		{
			this.s = true;
		}
		if(e.code == "Digit1")
		{
			this.weapon = 1;
		}
		if(e.code == "Digit2")
		{
			this.weapon = 2;
		}
		if(e.code == "ShiftLeft")
		{
			this.shift = true;
		}
	}
	
	keyUp(e)
	{
		if(e.code == "KeyD")
		{
			this.d = false;
		}
		if(e.code == "KeyA")
		{
			this.a = false;
		}
		if(e.code == "KeyW")
		{
			this.w = false;
		}
		if(e.code == "KeyS")
		{
			this.s = false;
		}
		if(e.code == "ShiftLeft")
		{
			this.shift = false;
		}
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
	
	shoot(rad, diff, bullets)
	{
		var bullet;
		switch(this.weapon)
		{
			case 1:
				bullet = new IceBall(this.x, this.y, rad, false, diff);
			break;
			case 2:
				bullet = new FireBall(this.x, this.y, rad, false, diff);
			break;
		}

		if(rnd(0,100) < this.criticalChanse)
		{
			bullet.critical = true;
			bullet.damage += this.baseDamage * this.lvl;
			bullet.damage *= this.power + this.criticalDamageMultiply;
		}
		else
		{
			bullet.damage += this.baseDamage * this.lvl;
			bullet.damage *= this.power;
		}
		bullet.mpCost *= this.power;
		if(this.isAlive && this.mp >= bullet.mpCost)
		{
			this.mp -= bullet.mpCost;
			bullets.push(bullet);
		}
	}

	updateChars()
	{
		//STA
		this.hpReg = 0.01 + this.sta / 100;
		this.maxHp = 100 + ((this.sta - 1) * 20);
		//STR
		this.baseDamage = 5 + (this.str - 1) / 2;
		//DEX
		var spd = 0.005 + (this.dex - 1) / 10000;
		this.speed = spd > this.maxSpeed ? this.maxSpeed : spd;
		this.maxVel = 1 + (this.dex - 1) / 100;
		if(this.dex % 5 == 0)
			this.criticalChanse = Math.round((this.dex / 5 + 1) * 5);
	}
	
	update()
	{
		if(this.isAlive)
		{
			this.updateChars();
			if(this.d && this.xVel < this.maxVel)
				this.xVel += this.speed;
			else if(!this.d && this.xVel > 0)
				this.xVel -= this.speed;
				
			if(this.a && this.xVel > this.maxVel * -1)
				this.xVel -= this.speed;
			else if(!this.a && this.xVel < 0)
				this.xVel += this.speed;
				
			if(this.s && this.yVel  < this.maxVel)
				this.yVel  += this.speed;
			else if(!this.s && this.yVel  > 0)
				this.yVel  -= this.speed;
				
			if(this.w && this.yVel > this.maxVel * -1)
				this.yVel -= this.speed;
			else if(!this.w && this.yVel < 0)
				this.yVel += this.speed;
				
			if(!this.a  && !this.w && !this.s && !this.d  && (this.xVel  < this.speed  && this.xVel  > -this.speed))
				this.xVel  = 0;
				
			if(!this.a  && !this.w && !this.s && !this.d  && (this.yVel  < this.speed  && this.yVel  > -this.speed))
				this.yVel  = 0;
				
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
			
			if(this.exp >= this.maxExp)
			{
				this.levelUp();
			}
		}
	}

	levelUp()
	{
		this.exp = this.exp - this.maxExp;
		this.maxExp = (this.lvl + 1) * 100;
		this.lvl++;
		this.hp = this.maxHp;
		this.cp++;
		this.mp = this.maxMp;
	}
	
	drawUi(ctx)
	{
		var cnv = document.getElementById("canvas");
		// HP BAR
		ctx.fillStyle = "gray";
		ctx.fillRect(8, 8, 104, 14);
		
		ctx.fillStyle = "red";
		ctx.fillRect(10,10, this.hp * 100 / this.maxHp, 10);
		
		ctx.font = "12px";
		ctx.fillStyle = "white";
		ctx.fillText((this.hp * 100 / this.maxHp).toFixed(2) + "%", 45, 18);
		//========
		
		// MP BAR
		ctx.fillStyle = "gray";
		ctx.fillRect(8, 28, 104, 14);
		
		ctx.fillStyle = "blue";
		ctx.fillRect(10,30, this.mp * 100 / this.maxMp, 10);
		
		ctx.font = "12px";
		ctx.fillStyle = "white";
		ctx.fillText((this.mp * 100 / this.maxMp).toFixed(2) + "%", 45, 38);
		//========
		
		// EXP BAR
		ctx.fillStyle = "gray";
		ctx.fillRect(20, cnv.height - 10, cnv.width - 40, 5);
		
		ctx.fillStyle = "yellow";
		ctx.fillRect(20, cnv.height - 10, this.exp * (cnv.width - 40) / this.maxExp, 5);
		
		ctx.font = "12px";
		ctx.fillStyle = "white";
		ctx.fillText("LVL: " + this.lvl, 20, cnv.height - 15);
		ctx.fillText((this.exp * 100 / this.maxExp).toFixed(2) + "%", cnv.width - 50, cnv.height - 15);

		if(this.cp > 0)
		{
			document.getElementById("lvlup").style.display = "block";
		}
		else
		{
			document.getElementById("lvlup").style.display = "none";
		}
		//========
		
		// HOLDING BAR
		
		if(this.holding && this.power > this.minPower)
		{
			ctx.fillStyle = "gray";
			ctx.fillRect(this.x - 20, this.y - 15, 40, 5);	
			
			ctx.fillStyle = "aqua";
			ctx.fillRect(this.x - 20, this.y - 15, (this.power - 1) * 40 / (this.maxPower + 1) * 2, 5);
		}
		
		//========
	}
	
	draw(ctx)
	{
		ctx.fillStyle = "#fff";
		ctx.fillRect(this.x - this.width / 2,this.y - this.height / 2, this.width, this.height);
		this.drawUi(ctx);
	}
	
}