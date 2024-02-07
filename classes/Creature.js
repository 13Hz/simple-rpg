import {GameObject} from "./GameObject.js";
import {Inventory} from "./Inventory.js";
import {Dropping} from "./Dropping.js";
import {Drop} from "./Drop.js";
import {ItemList} from "./ItemList.js";
import {rnd} from "./Functions.js";

export class Creature extends GameObject
{	
	constructor()
	{
		super();
		
		this.hp = 100;
		this.maxHp = 100;
		
		this.mp = 100;
		this.maxMp = 100;
		
		this.hpReg = 0.01;
		this.mpReg = 0.5;
		
		this.exp = 0;
		this.maxExp = 100;
		this.lvl = 1;
		
		this.inventory = new Inventory();
		
		this.weapon = 1;
		
		this.xVel = 0;
		this.yVel = 0;
		this.maxVel = 1;
		this.speed = 0.005;
		
		this.isRunning = false;
		this.name = "Dummy";
		
		this.onHover = false;
		this.onAttack = false;
		this.spawnDate = new Date();

		this.showDamage = false;
		this.counter = 0;
		this.showValue = 0;

		this.takeCritical = false;
		
		this.dropping = new Dropping([new Drop(0, 20), new Drop(1,15), new Drop(2, 10), new Drop(3, 0.005), new Drop(4, 1)]);
	}
	
	drawInfo(ctx, player)
	{
		if((this.onHover || this.onAttack || player.shift) && this.isAlive)
		{
			ctx.font = "12px";
			ctx.fillStyle = "gray";
			//ctx.fillText(this.exp, this.x - ctx.measureText(this.name).width / 2, this.y - 20);
			ctx.fillText(this.name, this.x - ctx.measureText(this.name).width / 2, this.y - 20);
			if(this.lvl - player.lvl >= 5)
				ctx.fillText("???", this.x - ctx.measureText("???").width / 2, this.y - 10);
			else
				ctx.fillText(this.lvl + " lvl", this.x - ctx.measureText(this.lvl + " lvl").width / 2, this.y - 10);
			
			// HP BAR
			ctx.fillStyle = "gray";
			ctx.fillRect(this.x - 20, this.y - 35, 40, 3);	
			
			ctx.fillStyle = "red";
			ctx.fillRect(this.x - 20, this.y - 35, this.hp * 40 / this.maxHp, 3);
			//========
		}
		if(this.counter < 200 && this.showDamage)
		{
			if(!this.takeCritical)
			{
				ctx.fillStyle = "white";
				
			}
			else
			{
				ctx.fillStyle = "red"
			}
			ctx.fillText("-" + this.showValue, this.x - ctx.measureText("-" + this.showValue).width / 2 + 30, this.y - 25);
			this.counter++;
		}
		else
		{
			this.counter = 0;
			this.showDamage = false;
			this.takeCritical = false;
		}
	}
	
	moveToPoint(x, y)
	{
		if(x > this.x && this.xVel < this.maxVel)
			this.xVel += this.speed;
		else if(x < this.x && this.xVel > 0)
			this.xVel -= this.speed;
			
		if(x < this.x && this.xVel > this.maxVel * -1)
			this.xVel -= this.speed;
		else if(x > this.x && this.xVel < 0)
			this.xVel += this.speed;
			
		if(y > this.y && this.yVel  < this.maxVel)
			this.yVel  += this.speed;
		else if(y < this.y && this.yVel  > 0)
			this.yVel  -= this.speed;
			
		if(y < this.y && this.yVel > this.maxVel * -1)
			this.yVel -= this.speed;
		else if(y > this.y && this.yVel < 0)
			this.yVel += this.speed;
	}
	
	dropItem(id)
	{
		var item = new ItemList().createItem(id);
		if(item.type >= 3)
			item.stackable = true;
		item.x = this.x + rnd(-20,20);
		item.y = this.y + rnd(-20,20);
		window.items.push(item);
	}
}