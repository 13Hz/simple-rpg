class Potion extends Item
{
	constructor(x, y, cost, type)
	{
		super(x, y, type);
		this.type = type;
		this.name = "Зелье";
	}

}