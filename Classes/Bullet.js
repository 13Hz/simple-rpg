class Bullet extends GameObject
{
	constructor(x, y, angle, enemy, size)
	{
		super(angle);
		this.angle = angle;
		this.size = size;
		this.speed = 1;
		this.x = x;
		this.y = y;
		this.mpCost = 10;
		this.color = "red";
		this.width = 5 * this.size;
		this.height = 5 * this.size;
		this.damage = 10;
		this.enemy = enemy;
		
		this.critical = false;
	}
	
	checkInRoom(width, height)
	{
		if(this.isAlive)
		{
			if((this.x > width || this.x < 0) || (this.y > height || this.y < 0))
				this.isAlive = false;
		}
	}
	
	update()
	{
		if(this.isAlive)
		{
			var dx = Math.cos(this.angle);
			var dy = Math.sin(this.angle);
			this.x += this.speed * dx;
			this.y += this.speed * dy;
		}
	}
	
	draw(ctx)
	{
		if(this.isAlive)
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
		}
	}
}