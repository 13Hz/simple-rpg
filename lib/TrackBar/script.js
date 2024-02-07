export class TrackBar
{
	constructor(className, parentNode, displayer)
	{
		this.className = className;
		this.parentNode = parentNode;
		this.min = 0;
		this.max = 100;
		this.offsetX = 0;
		this.isDown = false;
		this.tracker = null;
		this.trackbar = null;
		this.value = 0;
		this.displayer = displayer;
		
		this.loadHtml();
	}
	
	loadHtml()
	{
		var mainNode = document.createElement("div");
		mainNode.className = "TrackBar " + this.className;
		
		var line = document.createElement("div");
		line.className = "line";
		
		var tracker = document.createElement("div");
		tracker.className = "tracker";
		
		mainNode.appendChild(line);
		mainNode.appendChild(tracker);
		
		tracker.addEventListener("mousedown", (e) => {
			this.oX = e.offsetX;
			this.isDown = true;
		});
		
		document.addEventListener("mouseup", () => { this.isDown = false; });
		
		document.addEventListener("mousemove", (e) => {
			if(this.isDown)
			{
				var position = parseInt(this.tracker.style.left.split('px')[0]);
				var x = e.x - this.oX - this.trackbar.getBoundingClientRect()["x"];
				
				this.value = map(position, this.min, this.max, 0, this.trackbar.offsetWidth - this.tracker.offsetWidth).toFixed(2);
				
				if(x < 0)
				{
					x = 0;
				}
				if(x > this.trackbar.offsetWidth - this.tracker.offsetWidth)
					x = this.trackbar.offsetWidth - this.tracker.offsetWidth;
				
				this.tracker.style.left = x;

				var old = reMap(this.value, this.min, this.max, 0, this.trackbar.offsetWidth - this.tracker.offsetWidth);
				this.update();
			}
		});
		
		this.parentNode.appendChild(mainNode);
		
		this.tracker = tracker;
		this.trackbar = mainNode;
		this.tracker.style.left = 0;
	}
	
	update()
	{
		if(this.displayer != null)
		{
			var position = parseInt(this.tracker.style.left.split('px')[0]);
			this.value = map(position, this.min, this.max, 0, this.trackbar.offsetWidth - this.tracker.offsetWidth).toFixed(2);
			this.displayer.innerText = Math.round(this.value);
		}
	}
}

function reMap(value, min1, max1, min, max)
{
	return Math.round((value * (max - min) + max1 * min - min1 * (max - min))/(max1 - min1));
}

function map(value, min1, max1, min, max)
{
	return (max1 - min1) * (value - min) / (max - min) + min1;
}