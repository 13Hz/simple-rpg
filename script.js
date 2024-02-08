import {Player} from "./classes/Player.js";
import {UIMenu} from "./lib/UIMenu/script.js";
import {TrackBar} from "./lib/TrackBar/script.js";
import {formatGoldString, getDistance, getItemById, getLogString, remove, removeAt} from "./classes/Functions.js";
import {Enemy} from "./classes/Enemy.js";
import {ItemList} from "./classes/ItemList.js";

window.player = new Player();

window.items = [];

window.itemList = [];
window.itemList.push(new ItemList("Пустая банка", 0, 5, 0, 1, "Банка. Пустая. Просто мусор."));
window.itemList.push(new ItemList("Крышка", 0, 5, 1, 1, "Крышка от пластиковой бутылки. Совершенно не имеет цены."));
window.itemList.push(new ItemList("Палка", 0, 4, 2, 5, "Крепкая и длинная. Служит материалом при создании предметов."));
window.itemList.push(new ItemList("Глаз бога", 4, 4, 3, 100000, "Слабо переливающийся тусклым светом камень. Потерев его вы слышите голоса.<br>Кто знает для чего он нужен и какие тайны скрывает..."));
window.itemList.push(new ItemList("Кольцо из соломы", 1, 2, 4, 100, "Плотно сплетенное кольцо из соломы. Идеально подходит под ваш размер пальца.<br>Интересно, зачем кукле кольцо?"));

var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");

var width = 600;
var height = 600;

var bullets = [];
var enemys = [];

document.oncontextmenu = function() {}
document.addEventListener("keydown", (e) => window.player.keyDown(e));
document.addEventListener("keyup", (e) => window.player.keyUp(e));
document.querySelector('#spawn__button').addEventListener('click', spawn);

var lX = 0;
var lY = 0;
var dl = 0;
var angle = 0;
var rad = 0;

cnv.onmousemove = function(e)
{
	lX = e.x;
	lY = e.y;
	window.items.forEach(function(item){
		if(item.isAlive)
		{
			var bX = item.x;
			var bY = item.y;
			var w = item.width / 2;
			var h = item.height / 2;
			if((lX >= bX - w && lX <= bX + w) && (lY >= bY - h && lY <= bY + h))
			{
				item.onHover = true;
			}
			else
			{
				item.onHover = false;
			}
		}
	});
}


var mStart = null;
var mEnd = null;
var mDifference = null;
var mMax = 3;
var mMin = 1;

cnv.onmousedown = function(e)
{
	mStart = new Date();
	window.player.holding = true;
}

cnv.onmouseup = function(e)
{
	mEnd = new Date();
	mDifference = (mEnd - mStart) / 500;
	if(mDifference > mMax)
		mDifference = mMax;
	else if(mDifference < mMin)
		mDifference = mMin;
	window.player.holding = false;
}
cnv.onclick = function(e)
{
	dl = Math.sqrt(Math.pow(window.player.x - lX, 2) + Math.pow(window.player.y - lY, 2));
	rad = Math.atan2(lY - window.player.y, lX - window.player.x);
	angle = rad * -180 / Math.PI;


	var onItem = false;
	window.items.forEach(function(item){
		if(item.onHover && item.isAlive)
		{
			onItem = true;
			if(getDistance(item.x,item.y,window.player.x,window.player.y) <= 30)
			{
				item.picked = true;
			}
		}
	});
	if(!onItem)
		window.player.shoot(rad, mDifference, bullets);
	else
		onItem = false;

}

function clear()
{
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,width,height);
}

function draw()
{
	clear();
	window.player.draw(ctx);
	bullets.forEach(function(bullet){
		if(bullet.isAlive)
		{
			bullet.draw(ctx);
		}
	});
	enemys.forEach(function(enemy){
		if(enemy.isAlive)
		{
			enemy.draw(ctx, window.player);
		}
	});
	window.items.forEach(function(item){
		item.draw(ctx);
	});
}

function update()
{
	if(window.player.holding)
	{
		mEnd = new Date();
		mDifference = (mEnd - mStart) / 500;
		if(mDifference > mMax)
			mDifference = mMax;
		else if(mDifference < mMin)
			mDifference = mMin;

		window.player.power = mDifference;
	}
	else
	{
		window.player.power = window.player.minPower;
	}

	window.player.update();

	for(var i = 0; i < bullets.length; i++)
	{
		var bullet = bullets[i];
		if(bullet.isAlive)
		{
			bullet.checkInRoom(width,height);
			bullet.update();
			if(bullet.enemy)
			{
				if(checkCollision(window.player, bullet))
				{
					window.player.hp -= bullet.damage;
					bullet.isAlive = false;
				}
			}
			else
			{
				enemys.forEach(function(enemy){
					if(enemy.takeDamage(bullet))
					{
						enemy.dropping.drop(enemy);
						window.player.exp += enemy.exp;
						console.log(getLogString("Вы получили " + enemy.exp + " EXP"));
					}
				});

			}
		}

	}
	for(var i = 0; i < enemys.length; i++)
	{
		var enemy = enemys[i];
		if(enemy.isAlive)
		{
			enemy.update(window.player);
			var bX = enemy.x;
			var bY = enemy.y;
			var w = enemy.width / 2;
			var h = enemy.height / 2;
			if((lX >= bX - w && lX <= bX + w) && (lY >= bY - h && lY <= bY + h))
				enemy.onHover = true;
			else
				enemy.onHover = false;
		}
	}
	var iHover = false;
	for(var i = 0; i < window.items.length; i++)
	{
		var item = window.items[i];
		if(item.isAlive)
		{
			item.update(window.player);
			if(item.onHover)
				iHover = true;

		}
		else
		{
			window.items = removeAt(window.items, i);
			break;
		}
	}

	if(iHover)
		document.documentElement.style.cursor = "pointer";
	else
		document.documentElement.style.cursor = "";
}

function regen()
{
	player.regen();
}

function spawn()
{
	var en = new Enemy(Math.random() * 500, Math.random() * 500);
	en.lvl = document.querySelector("#spawner").value
	var diff = window.player.lvl - en.lvl;
	if(diff > 0)
		en.exp = 10 + 5 * Math.pow(1.5, diff + 1);
	else if(diff < 0)
		en.exp = 10 + 5 * Math.pow(1.1, -diff);
	else
		en.exp = 15;

	en.maxHp = en.lvl * 20;
	en.hp = en.lvl * 20;

	enemys.push(en);
}

function spawnLvl(lvl)
{
	var en = new Enemy(Math.random() * 500, Math.random() * 500);
	en.lvl = lvl;

	en.maxHp = en.lvl * 100;
	en.hp = en.lvl * 100;

	enemys.push(en);
}

var windows = []
windows.push(new UIMenu("KeyI", "inventory", "Инвентарь", windows))

var invNode = document.querySelector("#UIMenu.inventory");
var invAction = document.createElement("div");
invAction.className = "invAction";
invAction.innerText = "Золото: 0";
invNode.appendChild(invAction);

windows.push(new UIMenu("KeyC", "characters", "Характеристики", windows))
windows.push(new UIMenu("none", "count", "Количество", windows))

var c = document.createElement("div");
c.className = "counter-text";

var sellBtn = document.createElement("div");
sellBtn.className = "sell-btn";
sellBtn.innerText = "Продать";

window.itemSellTrack = new TrackBar("counter", document.querySelector("#UIMenu.count .body"), c);

sellBtn.onclick = function()
{
	var invNode = document.querySelector("#UIMenu.inventory .body");
	var item = getItemById(window.itemSellTrack.currentItemId, player);
	var count = Math.round(window.itemSellTrack.value);
	item.count -= count;
	if(item.count <= 0)
	{
		player.inventory.items = remove(player.inventory.items, item);
		invNode.removeChild(window.itemSellTrack.selectedRow);
	}
	else
	{
		window.itemSellTrack.selectedRow.querySelector(".itemName").innerText = item.name + " (" + item.count + ")";
	}
	player.inventory.gold += item.cost * count;
	document.querySelector("#UIMenu.count").hidden = true;
}

document.querySelector("#UIMenu.count .body").appendChild(c);
document.querySelector("#UIMenu.count .body").appendChild(sellBtn);

setInterval(draw, 1);
setInterval(update, 1);
setInterval(regen, 100);