//
//			UIMenu ver. a0.3
//								by 13Hz
//									2020 г.
/*
	Библиотека для создания адаптивных визуальных менюшек
*/

export class UIMenu
{
	constructor(keyCode, className, title, arrayWindow)
	{
		this.windows = arrayWindow;
		this.visible = false;
		this.keyCode = keyCode;
		this.className = className;
		this.title = title;
		this.mainNode = null;
		this.isDrag = false;
		this.mouseX = 0;
		this.mouseY = 0;
		
		this.loadDocument();
		this.setup(this);
		this.mainNode.hidden = true;
		
		this.mainNode.style.left = (document.documentElement.offsetWidth / 2 + this.mainNode.offsetWidth / 2) + "px";
		this.mainNode.style.top = "90px";
	}
	
	loadDocument()
	{
		var main = document.createElement("div");
		
		main.id = "UIMenu";
		main.className = this.className;
		
		var header = document.createElement("div");
		header.className = "UIMenuElements header";
		
		var title = document.createElement("div");
		title.className = "UIMenuElements title";
		title.innerHTML = this.title;
		
		var close = document.createElement("div");
		close.innerHTML = "X";
		close.className = "UIMenuElements closeBtn";
		
		header.appendChild(title);
		header.appendChild(close);
		
		var body = document.createElement("div");
		body.className = "UIMenuElements body";
		
		main.appendChild(header);
		main.appendChild(body);
		
		document.body.appendChild(main);
		this.mainNode = document.querySelector("#UIMenu." + this.className);
	}
	
	setup(obj)
	{
		document.onkeydown = function(e)
		{
			obj.windows.forEach(function (i)
			{
				if(e.code == i.keyCode)
				{
					i.mainNode.hidden = !i.mainNode.hidden;
				}
			});
		}
		
		obj.mainNode.onmousedown = function(e)
		{
			if(e.target == obj.mainNode.querySelector(".title"))
			{
				obj.mainNode.style.zIndex = 1;
				
				obj.windows.forEach(function (i)
				{
					if(i != obj)
						i.mainNode.style.zIndex = 0;
				});

				obj.mouseX = e.offsetX;
				obj.mouseY = e.offsetY;
				if(e.offsetY < 38)
					obj.isDrag = true;
			}
		}
		
		document.onmouseup = function(e)
		{
			obj.windows.forEach(function (i) { i.isDrag = false; });
		}
		
		document.onmousemove = function(e)
		{
			obj.windows.forEach(function (i)
			{
				if(i.isDrag)
				{
					i.mainNode.style.left = (e.x - i.mouseX) + "px";
					i.mainNode.style.top = (e.y - i.mouseY) + "px";
				}
			});

		}
		
		this.mainNode.querySelector(".closeBtn").onclick = function(){ this.offsetParent.hidden = true;} 
	}
}

/*
~~~~~~~~Пример инициализации класса UIMenu~~~~~~~~~~~~~

var windows = []
windows.push(new UIMenu("KeyI", "inventory", "Инвентарь", windows))
windows.push(new UIMenu("KeyC", "characters", "Характеристики", windows))
*/