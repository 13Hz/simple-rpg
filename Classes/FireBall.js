class FireBall extends Bullet
{
	constructor(x,y,angle,speed,mpCost,color)
	{
		super(x,y,angle,speed,mpCost,color);
		this.speed = 1;
		this.mpCost = 10;
		this.color = "red";
		this.speed = 2;
	}

}