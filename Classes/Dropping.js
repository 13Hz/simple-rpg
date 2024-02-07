// ID : [ ITEM , CHANSE ]
class Drop
{
	constructor(itemId, chanse)
	{
		this.itemId = itemId;
		this.chanse = chanse;
	}

}

class Dropping
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
				if(this.items[i].itemId == 3)
					console.log("ZXCZXC");
				var item = null;
				for(var j = 0; j < itemList.length; j++)
				{
					if(this.items[i].itemId == itemList[j].id)
					{
						item = itemList[j];
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