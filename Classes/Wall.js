class Wall extends GameObject
{
	constructor(x, y)
	{
		super();
		this.x = x;
		this.y = y;
		this.width = 100;
		this.height = 10;
		this.color = "gray";
	}
	
	draw(ctx)
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	}
}