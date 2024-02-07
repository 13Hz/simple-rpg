var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");

var gameName = "#ИМЯ?";
var gameVersion = "v0.0.1a";
var playerName = "";

var width = 600;
var height = 600;
/*
ctx.fillStyle = "#000";
ctx.fillRect(0,0,width,height);

ctx.fillStyle = "white";
ctx.font = "50px Consolas";

var w = ctx.measureText(gameName).width;
ctx.fillText(gameName, width / 2 - w / 2, 100);

ctx.fillStyle = "lightgray";
ctx.font = "13px Consolas";
ctx.fillText(gameVersion, width / 2 + w / 2 - 10, 115);



class Button
{
	constructor(x, y, text, fillStyle, size, font)
	{
		this.x = x;
		this.y = y;
		this.text = text;
		this.fillStyle = fillStyle;
		this.size = size;
		this.font = font;
		this.width = this.getWidth();
	}
	
	draw()
	{
		ctx.fillStyle = this.fillStyle;
		ctx.font = this.font;
		ctx.fillText(this.text, this.x, this.y);
	}
	
	getWidth()
	{
		ctx.fillStyle = this.fillStyle;
		ctx.font = this.font;
		return ctx.measureText(this.text).width;
	}
}

var buttons = [];

var btn1 = new Button(0, 210, "Начать", "white", 36, "36px Consolas");
var btn2 = new Button(0, 260, "Опции", "white", 36, "36px Consolas");
var btn3 = new Button(0, 310, "Выход", "white", 36, "36px Consolas");
btn1.x = width / 2 - btn1.width / 2;
btn2.x = width / 2 - btn2.width / 2;
btn3.x = width / 2 - btn3.width / 2;

buttons.push(btn1);
buttons.push(btn2);
buttons.push(btn3);

buttons.forEach(function(btn){btn.draw()});

var tst = false;

cnv.onmousemove = function(e)
{
	lX = e.x;
	lY = e.y;
	for(var i = 0; i < buttons.length; i++)
	{
		var btn = buttons[i];
		var x = btn.x;
		var y = btn.y - btn.size + 10;
		var wdth = btn.getWidth();
		var hgth = btn.size - 10;
		
		if((lX >= x && lX <= x + wdth) && (lY >= y && lY <= y + hgth))
			tst = true;
		else
			tst = false;
	}
}

setInterval(() => {if(tst) {document.documentElement.style.cursor = "pointer"} else {document.documentElement.style.cursor = "default"}}, 1); 
*/
if(true)
{

	var player = new Player();
	var bullets = new Array();
	var enemys = new Array();
	var items = new Array();

	var z = 0;

	var checker = false;

	document.oncontextmenu = function() {}

	document.addEventListener("keydown", (e) => player.keyDown(e));
	document.addEventListener("keyup", (e) => player.keyUp(e));

	var lX = 0;
	var lY = 0;
	var dl = 0;
	var angle = 0;
	var rad = 0;
	var dx = 0;
	var dy = 0;
	var offset = 0;

	cnv.onmousemove = function(e)
	{
		lX = e.x;
		lY = e.y;
		items.forEach(function(item){
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
		player.holding = true;
	}

	cnv.onmouseup = function(e)
	{
		mEnd = new Date();
		mDifference = (mEnd - mStart) / 500;
		if(mDifference > mMax)
			mDifference = mMax;
		else if(mDifference < mMin)
			mDifference = mMin;
		player.holding = false;
	}
	cnv.onclick = function(e)
	{
		dl = Math.sqrt(Math.pow(player.x - lX, 2) + Math.pow(player.y - lY, 2));
		rad = Math.atan2(lY - player.y, lX - player.x);
		angle = rad * -180 / Math.PI;
		
		
		var onItem = false;
		items.forEach(function(item){
			if(item.onHover && item.isAlive)
			{
				onItem = true;
				if(getDistance(item.x,item.y,player.x,player.y) <= 30)
				{
					item.picked = true;
				}
			}
		});
		if(!onItem)
			player.shoot(rad, mDifference, bullets);
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
		player.draw(ctx);
		bullets.forEach(function(bullet){
			if(bullet.isAlive)
			{
				bullet.draw(ctx);
			}
		});
		enemys.forEach(function(enemy){
			if(enemy.isAlive)
			{
				enemy.draw(ctx, player);
			}
		});	
		items.forEach(function(item){
			item.draw(ctx);
		});	
	}

	function update()
	{
		if(player.holding)
		{
			mEnd = new Date();
			mDifference = (mEnd - mStart) / 500;
			if(mDifference > mMax)
				mDifference = mMax;
			else if(mDifference < mMin)
				mDifference = mMin;
			
			player.power = mDifference;
		}
		else
		{
			player.power = player.minPower;
		}
		player.update();
		
		if(!player.abuseMode && (player.maxMp - player.mp < -10 || 
								 player.maxHp - player.hp < -10 || 
								 player.cp > player.lvl ||
								 player.str > player.lvl ||
								 player.dex > player.lvl ||
								 player.int > player.lvl ||
								 player.sta > player.lvl))
			player.abuseMode = true;
		
		
		
		for(var i = 0; i < bullets.length; i++)
		{
			var bullet = bullets[i];
			if(bullet.isAlive)
			{
				bullet.checkInRoom(width,height);
				bullet.update();
				if(bullet.enemy)
				{
					if(checkCollision(player, bullet))
					{
						player.hp -= bullet.damage;
						bullet.isAlive = false;
					}
				}
				else
				{
					enemys.forEach(function(enemy){
						if(enemy.takeDamage(bullet))
						{
							enemy.dropping.drop(enemy);
							player.exp += enemy.exp;
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
				enemy.update(player);
				var bX = enemy.x;
				var bY = enemy.y;
				var w = enemy.width / 2;
				var h = enemy.height / 2;
				if((lX >= bX - w && lX <= bX + w) && (lY >= bY - h && lY <= bY + h))
					enemy.onHover = true;
				else
					enemy.onHover = false;
			}
			/*
			else
			{
				enemys = removeAt(enemys, i);
				break;
			}
			*/
		}
		var iHover = false;
		for(var i = 0; i < items.length; i++)
		{
			var item = items[i];
			if(item.isAlive)
			{
				item.update(player);
				if(item.onHover)
					iHover = true;
					
			}
			else
			{
				items = removeAt(items, i);
				break;
			}
		}
		
		if(iHover)
		document.documentElement.style.cursor = "pointer";
		else
		document.documentElement.style.cursor = "";

		document.querySelector("#UIMenu.inventory .invAction").innerHTML = "Золото: " + formatGoldString(player.inventory.gold);
	}

	function regen()
	{
		player.regen();
	}

	function spawn()
	{
		var en = new Enemy(Math.random() * 500, Math.random() * 500);
		en.lvl = document.querySelector("#spawner").value
		var diff = player.lvl - en.lvl;
		if(diff > 0)
			en.exp = 10 + 5 * Math.pow(1.5, diff + 1);
		else if(diff < 0)
			en.exp = 10 + 5 * Math.pow(1.1, -diff);
		else
			en.exp = 15;
			
		en.maxHp = en.lvl * 20;
		en.hp = en.lvl * 20;
		//en.onAttack = true;
		enemys.push(en);
		//
	}

	function spawnLvl(lvl)
	{
		var en = new Enemy(Math.random() * 500, Math.random() * 500);
		en.lvl = lvl;

			
		en.maxHp = en.lvl * 100;
		en.hp = en.lvl * 100;
		//en.onAttack = true;
		enemys.push(en);

	}

	var windows = []
	windows.push(new UIMenu("KeyI", "inventory", "Инвентарь", windows))

	var invNode = document.querySelector("#UIMenu.inventory");
	var invAction = document.createElement("div");
	invAction.className = "invAction";
	invNode.appendChild(invAction);

	//windows.push(new UIMenu("KeyC", "characters", "Характеристики", windows))
	//windows.push(new UIMenu("KeyT", "test", "Тест", windows))
	windows.push(new UIMenu("none", "count", "Количество", windows))
	
	var c = document.createElement("div");
	c.className = "counter-text";

	var sellBtn = document.createElement("div");
	sellBtn.className = "sell-btn";
	sellBtn.innerText = "Продать";

	var itemSellTrack = new TrackBar("counter", document.querySelector("#UIMenu.count .body"), c);
	
	sellBtn.onclick = function()
	{
		var invNode = document.querySelector("#UIMenu.inventory .body");
		var item = getItemById(itemSellTrack.currentItemId, player);
		var count = Math.round(itemSellTrack.value);
		item.count -= count;
		if(item.count <= 0)
		{
			player.inventory.items = remove(player.inventory.items, item);
			invNode.removeChild(itemSellTrack.selectedRow);
		}
		else
		{
			itemSellTrack.selectedRow.querySelector(".itemName").innerText = item.name + " (" + item.count + ")";
		}
		player.inventory.gold += item.cost * count;
		document.querySelector("#UIMenu.count").hidden = true;
	}

	

	document.querySelector("#UIMenu.count .body").appendChild(c);
	document.querySelector("#UIMenu.count .body").appendChild(sellBtn);
	
	setInterval(draw, 1);
	setInterval(update, 1);
	setInterval(regen, 100);
}