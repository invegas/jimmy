window.Parallax = (function () {
	var progress = 0.0, total, innerWidth, person, person_w, win, offsetx;
	var level = 0;
	var timeline = {
		0.2: {
			skyColor: "#5e879b"		
		},
		0.3: {
			skyColor: "#41677a"
		},
		0.4: {
			skyColor: "#224757"
		},
		0.5: {
			skyColor: "#032435"
		},
		0.6: {
			skyColor: "#224757"
		},
		0.7: {
			skyColor: "#41677a"
		},
		0.8: {
			skyColor: "#5e879b"
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
		$('.speech').slideDown(300);
		$('.speech-content').text(word);		
	}

	var shutup = function () {
		$('.speech').slideUp(300);
	}

	var skyColorChange = function (color) {
		if (!color) var color = '#5e879b';
		$('body').css('background-color', color);
	}

	var bgPull = function () {
// $('.bg-item').css('background-position-x', '+=10px');
	}

	var onProgress = function () {
	    offsetx = win.scrollLeft();
	    var origin = progress;
	    progress = offsetx / (total - win.innerWidth());
	    // $('.bg-item').css('background-position-x', (1 - progress) * 2000);

	    if (progress > origin) {
	    	$('.bg-item').css('background-position-x', '-=30px');
	    } else {
	    	$('.bg-item').css('background-position-x', '+=30px');
	    }

	    // Jimmy walk
	    walk(); 
	    // I need a bus !!!

	    // Weather
	    var percent = Util.myFixed(progress, 1);
	    console.log(percent);
	    if (timeline[percent]) {
	    	var cfg = timeline[percent];
	    	// sky color
	    	if (cfg.skyColor) {
	    		$('body').css('background-color', cfg.skyColor);
	    	}

	    	// say something
	    	if (cfg.sayWord) {
	    		speak(cfg.sayWord);
	    	} else {

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