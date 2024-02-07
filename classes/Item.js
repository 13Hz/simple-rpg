import {GameObject} from "./GameObject.js";
import {getLogString} from "./Functions.js";
import {remove} from "./Functions.js";

export class Item extends GameObject
{
	constructor(x, y, cost)
	{
		super(cost);
		this.x = x;
		this.y = y;
		this.cost = cost;
		this.count = 1;
		this.color = "#c19c3d";
		this.width = 10;
		this.height = 10;
		this.picked = false;
		this.name = "";
		this.displayName = "";
		this.onHover = false;
		this.rarity = 0;
		this.id = 0;
		this.invX = 0;
		this.invY = 0;
		this.types = ['Оружие', 'Броня', 'Бижутерия', 'Зелье', 'Материал', 'Мусор'];
		this.type = 5;
		this.itemId = 0;
		this.stackable = false;
		this.className = "";
	}
	
	draw(ctx)
	{
		if(this.isAlive)
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			if(this.onHover || window.player.shift)
			{
				ctx.font = "12px";
				switch(this.rarity)
				{
					case 0:
						ctx.fillStyle = "gray"; //Обычный
					break;
					case 1:
						ctx.fillStyle = "#5aec94"; //Магический
					break;					
					case 2:
						ctx.fillStyle = "#5ae5ec"; //Мистический
					break;					
					case 3:
						ctx.fillStyle = "#fdf868"; //Редкий
					break;					
					case 4:
						ctx.fillStyle = "#ff683a"; //Уникальный
					break;					
				}
				ctx.fillText(this.displayName, this.x - ctx.measureText(this.displayName).width / 2, this.y - 10);
			}
		}
	}
	
	update(player)
	{
		if(this.isAlive)
		{
			switch(this.rarity)
			{
				case 0:
					this.displayName = "[Обычный] " + this.name; //Обычный
					this.className = "itemName";
				break;
				case 1:
					this.displayName = "[Магический] " + this.name; //Магический
					this.className = "itemName magic";
				break;					
				case 2:
					this.displayName = "[Мистический] " + this.name; //Мистический
					this.className = "itemName myst";
				break;					
				case 3:
					this.displayName = "[Редкий] " + this.name; //Редкий
					this.className = "itemName rare";
				break;					
				case 4:
					this.displayName = "[Уникальный] " + this.name; //Уникальный
					this.className = "itemName unic";
				break;					
			}
			if(this.picked)
			{
				var inv = player.inventory;
				this.x = 0; // для визуального инвентаря
				this.y = 0;
				this.picked = false;
				this.isAlive = false;
				
				var stack = false;
				var id = 0;
				if(this.stackable)
				{
					for(var i = 0; i < inv.items.length; i++)
					{
						if(inv.items[i].itemId == this.itemId)
						{
							stack = true;
							id = i;
							break;
						}
						
					}
				}
				
				if(!stack)
				{
					console.log(getLogString("Вы подобрали " + this.name));
					this.id = player.itemsIdCounter;
					player.itemsIdCounter = player.itemsIdCounter + 1;

					inv.items.push(this);
					
					var invNode = document.querySelector("#UIMenu.inventory .body");
					var itemRow = document.createElement("div");
					itemRow.setAttribute("id", this.id);
					itemRow.className = "itemRow";
					var itemName = document.createElement("div");
					
					var hoverDesc = false;
					var hoverItem = null;
					
					itemName.onmouseover = function(e)
					{
						var id = this.parentElement.getAttribute("id");
						hoverItem = getItemById(id, player);
						var itemList = getItemListById(hoverItem.itemId);
						document.querySelector("#description .title").innerHTML = hoverItem.name;
						document.querySelector("#description .body").innerHTML = itemList.description + "<br><br>";
						document.querySelector("#description .body").innerHTML += "Тип: " + hoverItem.types[hoverItem.type] + "<br>" + "Стоимость: " + hoverItem.cost;
						hoverDesc = true;
						document.querySelector("#description").style.display = "block";
					}
					
					itemName.onmouseout = function(e)
					{
						hoverDesc = false;
						document.querySelector("#description").style.display = "none";
					}
					
					itemName.className = this.className;
					itemName.innerHTML = this.name;
					itemRow.appendChild(itemName);
					
					var itemAction = document.createElement("div");
					itemAction.className = "itemAction";
					
					var eq = document.createElement("div");
					eq.className = "action equipItem disabled";
					eq.innerHTML = "E";
					
					var sell = document.createElement("div");
					sell.className = "action sellItem";
					sell.innerHTML = "S";
					
					var drop = document.createElement("div");
					drop.className = "action dropItem";
					drop.innerHTML = "D";
					
					drop.addEventListener("click", (e) => 
					{
						var id = parseInt(e.target.parentNode.parentNode.getAttribute("id"));
						for(var i = 0; i < player.inventory.items.length; i++)
						{
							var item = player.inventory.items[i];
							if(item.id == id)
							{
								item.isAlive = true;
								item.picked = false;
								item.onHover = false;
								player.dropItem(item.itemId);
								//item.x = player.x;
								//item.y = player.y;
								
								player.inventory.items = remove(player.inventory.items, item);
								invNode.removeChild(e.target.parentNode.parentNode);
								break;
							}
						}

					});
					
					sell.addEventListener("click", (e) => 
					{
						var id = parseInt(e.target.parentNode.parentNode.getAttribute("id"));
						var itemRow = e.target.parentNode.parentNode;
						for(var i = 0; i < player.inventory.items.length; i++)
						{
							var item = player.inventory.items[i];
							if(item.id == id)
							{
								
								//item.x = player.x;
								//item.y = player.y;
								if(item.count > 1)
								{
									document.querySelector("#UIMenu.count").hidden = false;
									window.itemSellTrack.value = 1;
									window.itemSellTrack.min = 1;
									window.itemSellTrack.max = item.count;
									window.itemSellTrack.currentItemId = id;
									window.itemSellTrack.selectedRow = itemRow;
									window.itemSellTrack.update();
									//item.count--;	
									//itemRow.querySelector(".itemName").innerText = item.name + " (" + item.count + ")";
								}
								else if(item.count == 1)
								{
									player.inventory.items = remove(player.inventory.items, item);
									invNode.removeChild(itemRow);
									player.inventory.gold += item.cost;
								}
								break;
							}
						}

					});
					
					itemAction.appendChild(eq);
					itemAction.appendChild(sell);
					itemAction.appendChild(drop);

					itemRow.appendChild(itemAction);
					
					itemRow.onmousemove = function(e)
					{
						if(hoverDesc)
						{
							document.querySelector("#description").style.left = e.x + 3;
							document.querySelector("#description").style.top = e.y + 3;
							//var item = player.inventory.items[this.parentElement.getAttribute("id")];
							//document.querySelector("#description .title").innerHTML =  
						}
					}
					
					var tItem = this;
					
					invNode.appendChild(itemRow);
				}
				else
				{
					inv.items[id].count++;
					var itemRow = document.querySelector(".itemRow[id='" + inv.items[id].id + "']");
					itemRow.querySelector(".itemName").innerText = inv.items[id].name + " (" + inv.items[id].count + ")";
				}
			}
		}
	}
	
}