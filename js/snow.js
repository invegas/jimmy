window.Snow = (function () {
	var W, H, ctx;
	// particle setting
	var mp = 25, particles = [], angle = 2;//max particles

	var winSetting = function () {
		//canvas dimensions
		W = window.innerWidth; 
		H = window.innerHeight;
		canvas.width = W;
		canvas.height = H;
	}


	var init = function (canvas_id) {
		var canvas = document.getElementById(canvas_id);
		ctx = canvas.getContext("2d");
	
		winSetting();
		generateParticle();
		snowStart();
	}

	var generateParticle = function () {
		for(var i = 0; i < mp; i++)
		{
			particles.push({
				x: Math.random()*W, //x-coordinate
				y: Math.random()*H, //y-coordinate
				r: Math.random()*4+1, //radius
				d: Math.random()*mp //density
			})
		}
	}

	var update = function () {
        angle = 2;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			//p.y += Math.cos(angle+p.d) + 1 + p.r/2;
            p.y += Math.cos(angle) + 1 + p.r/2;
            p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
            if(p.x > W || p.x < 0 || p.y > H) {
                if (i%3 > 0) {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                } else {
                    particles[i] = {x: 0, y: Math.random()*H, r: p.r, d: p.d};
                }
            }
		}
	}

	var draw = function () {
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = "rgba(255, 255, 255, 1)";
        // 开始绘制路径
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
            // 将笔触移至
			ctx.moveTo(p.x, p.y);
            // Canvas画圆 context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
        
		update();
	}

	var redraw = function () {
		winSetting();
	}

	var snowStart = function () {
		setInterval(draw, 33);
	}

	return {
		init: init,
		redraw: redraw
	}
})()