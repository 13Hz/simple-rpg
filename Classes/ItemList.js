class ItemList
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
		var itemListChild = parseItemById(id);
		var item = new Item();
		item.name = itemListChild.name;
		item.rarity = itemListChild.rarity;
		item.type = itemListChild.type;
		item.itemId = itemListChild.id;
		item.cost = itemListChild.cost;
		return item;
	}
}

var itemList = [];

function parseItemById(id)
{
	for(var i = 0; i < itemList.length; i++)
	{
		if(id == itemList[i].id)
			return itemList[i];
	}
}


/*
Редкость:
0 Обычный
1 Магический
2 Мистический
3 Редкий
4 Уникальный

Типы:
0 Оружие
1 Броня
2 Бижутерия
3 Зелье
4 Материал 
5 Мусор

Имя | Редкость | Тип | ID | Стоимость

*/

itemList.push(new ItemList("Пустая банка", 0, 5, 0, 1, "Банка. Пустая. Просто мусор."));
itemList.push(new ItemList("Крышка", 0, 5, 1, 1, "Крышка от пластиковой бутылки. Совершенно не имеет цены."));
itemList.push(new ItemList("Палка", 0, 4, 2, 5, "Крепкая и длинная. Служит материалом при создании предметов."));
itemList.push(new ItemList("Глаз бога", 4, 4, 3, 100000, "Слабо переливающийся тусклым светом камень. Потерев его вы слышите голоса.<br>Кто знает для чего он нужен и какие тайны скрывает..."));
itemList.push(new ItemList("Кольцо из соломы", 1, 2, 4, 100, "Плотно сплетенное кольцо из соломы. Идеально подходит под ваш размер пальца.<br>Интересно, зачем кукле кольцо?"));