export class Dropping
{
	constructor(items)
	{
		this.items = items;
	}
	
	drop(parent)
	{
		for(var i = 0; i < this.items.length; i++)
		{
			var result = Math.random() * 100;
			if(result <= this.items[i].chanse)
			{
				var item = null;
				for(var j = 0; j < window.itemList.length; j++)
				{
					if(this.items[i].itemId == window.itemList[j].id)
					{
						item = window.itemList[j];
						break;
					}
				}
				if(item != null)
				{
					parent.dropItem(item.id);
				}
			}
		}
	}
}