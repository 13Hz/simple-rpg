function checkCollision(obj1, obj2)
{
	var w1 = obj1.width / 2;
	var h1 = obj1.height / 2;
	var w2 = obj2.width / 2;
	var h2 = obj2.height / 2;
	
	if((obj1.x + w1 >= obj2.x - w2 && obj1.x - w1 <= obj2.x + w2) && (obj1.y + h1 >= obj2.y - h2 && obj1.y - h1 <= obj2.y + h2))
		return true;
	else
		return false;
}

function getAngle(x0,y0,x1,y1,radian = false)
{
	if(radian)
	{
		return Math.atan2(y1 - y0, x1 - x0);
	}
	else
	{
		var rad = Math.atan2(y1 - y0, x1 - x0);
		return rad * -180 / Math.PI;
	}
}

function rnd(min, max)
{
	return Math.floor(Math.random() * (max - min) + min);
}

function getDistance(x0,y0,x1,y1)
{
	return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}

function getItemById(id, player)
{
	for(var i = 0; i < player.inventory.items.length; i++)
	{
		if(id == player.inventory.items[i].id)
			return player.inventory.items[i];
	}
}

function formatGoldString(gold)
{
	gold = gold.toString();
	var len = gold.length;
	var str = "";
	var spaces = [];
	for(var i = len - 1; i >= 0; i--)
	{
		if(i % 3 == 0 && i != 0)
		{
			spaces.push(len - i - 1);
		}
	}
	
	for(var i = 0; i < len; i++)
	{
		str += gold[i];
		for(var j = 0; j < spaces.length; j++)
		{
			if(i == spaces[j])
				str += " ";
		}
	}
	return str;
}

function getItemListById(id)
{
	for(var i = 0; i < itemList.length; i++)
	{
		if(id == itemList[i].id)
			return itemList[i];
	}
}

function removeAt(arr, id)
{
	var newArray = [];
	for(var i = 0; i < arr.length; i++)
	{
		if(i != id)
			newArray.push(arr[i]);
	}
	return newArray;
}

function checkAbuse()
{
	var now = new Date().getHours + new Date().getMinutes() + new Date.getSeconds();
	if(now == checker)
		return true;
	else
		return false;
}

function spawnItem(id)
{
	
}

function getElementInList(el, array)
{
	for(var i = 0; i < array.length; i++)
	{
		if(el == array)
		{
			return array[i];
		}
	}
}

function remove(arr, value)
{
	var newArray = [];
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i] != value)
			newArray.push(arr[i]);
	}
	return newArray;
}

function getLogString(str)
{
	var date = new Date();
	return "[" + date.toTimeString().slice(0, 8) + "] " + str;
}

function massSpawn(lvl, count)
{
	for(let i = 0;i<count;i++){spawnLvl(lvl);}
}