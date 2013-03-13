window.Parallax = (function () {
	var progress = 0.0, total, innerWidth, person, person_w, win, offsetx;
	var level = 0;
	var timeline = {
		0.0: {
			skyColor: "6b92b9"
		},
		0.1: {
			sayWord: "It's cold here, and It's going to dark"
		},
		0.2: {
			skyColor: "black",
			sayWord: "Look, just as I say"			
		}
	}

	var scrollInit = function () {
		setTimeout (function () {
			scrollTo(0,0);
		}, 100);
	}	

	var initSetting = function (cfg) {
		win = cfg.win;
		person = cfg.person;
		person_w = parseInt(person.css('width'));
		total = cfg.total;
		innerWidth = $(window).innerWidth();
	}

	var init = function (cfg) {

		scrollInit();
		initSetting(cfg)
		walk();

		win.scroll(function () {
			onProgress();
			// walk();
		}).resize(function () {
			innerWidth = win.innerWidth();
			onProgress();
			// walk();
		})
	}

	// var speak = function () {
	// 	var shutup = function () {
	// 		$('.speech').removeClass('is-say');
	// 	}

	// 	var say = function (word) {
	// 		$('.speech').addClass('is-say');
	// 		$('.speech-content').text(word);
	// 	}

	// 	var percent = progress.toFixed(1);

	// 	switch(percent) {
	// 		case "0.1":  {
	// 			if (level === 1) return;
	// 			say("now begin");
	// 			level = 1;
	// 			break;
	// 		}
	// 		case "0.3": {
	// 			if (level === 3) return;
	// 			say("on progress"); 
	// 			$('body').css('background-color', 'black');
	// 			level = 3;
	// 			break;
	// 		}
	// 		case "0.5": {
	// 			if (level === 5) return;
	// 			say("it's cold here"); 
	// 			level = 5;
	// 			break;
	// 		}
	// 		default: {
	// 			if (level === 0) return;
	// 			shutup();
	// 			level = 0;
	// 			$('body').css('background-color', '#6b92b9');
	// 		}
	// 	}
	// }

	var walk = function () {
		person.css('left', (innerWidth - person_w) * (1 - progress) + "px");
	}

	var speak = function (word) {
		$('.speech').addClass('is-say');
		$('.speech-content').text(word);		
	}

	var shutup = function () {
		$('.speech').removeClass('is-say');		
	}

	var skyColorChange = function (color) {
		if (!color) var color = '#6b92b9';
		$('body').css('background-color', color);
	}

	var bgPull = function () {
// $('.bg-item').css('background-position-x', '+=10px');
	}

	var onProgress = function () {
	    offsetx = win.scrollLeft();
	    // var origin = progress;
	    progress = offsetx / (total - win.innerWidth());
	    // $('.bg-item').css('background-position-x', (1 - progress) * 2000);

	    // if (progress > origin) {
	    // 	$('.bg-item').css('background-position-x', '-=15px');
	    // } else {
	    // 	$('.bg-item').css('background-position-x', '+=15px');
	    // }

	    // Jimmy walk
	    walk(); 
	    // I need a bus !!!

	    // Weather
	    var percent = progress.toFixed(1);
	    console.log(percent);
	    if (timeline[percent]) {
	    	var cfg = timeline[percent];
	    	// sky color
	    	if (cfg.skyColor) {
	    		$('body').css('background-color', cfg.skyColor);
	    	}

	    	// say something
	    	if (cfg.sayWord) {
	    		$('.speech').addClass('is-say');
				$('.speech-content').text(cfg.sayWord);
	    	}
	    } else {
	    	shutup();
	    	skyColorChange();
	    }

	}

	return {
		init: init,
		scrollInit: scrollInit
	}
})()