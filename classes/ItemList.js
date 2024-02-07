import {Item} from "./Item.js";

export class ItemList
{
	constructor(name, rarity, type, id, cost, description)
	{
		this.name = name;
		this.rarity = rarity;
		this.type = type;
		this.id = id;
		this.description = description;
		this.cost = cost;
	}
	
	createItem(id)
	{
		var itemListChild = this.parseItemById(id);
		var item = new Item();
		item.name = itemListChild.name;
		item.rarity = itemListChild.rarity;
		item.type = itemListChild.type;
		item.itemId = itemListChild.id;
		item.cost = itemListChild.cost;
		return item;
	}

	parseItemById(id)
	{
		for(var i = 0; i < window.itemList.length; i++)
		{
			if(id == window.itemList[i].id)
				return window.itemList[i];
		}
	}
}