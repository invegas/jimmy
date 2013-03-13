window.Parallax = (function () {
	var progress = 0, total, innerWidth, person, person_w, win, offsetx;
	var level = 0;

	var scrollInit = function () {
		// window.scrollTo(0, 0);
		// $(window).scrollLeft(0);
		// document.location.href = "#";
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
			walk();
		}).resize(function () {
			innerWidth = win.innerWidth();
			onProgress();
			walk();
		})
	}

	var speak = function () {
		var shutup = function () {
			$('.speech').removeClass('is-say');
		}

		var say = function (word) {
			$('.speech').addClass('is-say');
			console.log(word);
		}

		var percent = progress.toFixed(1);
		console.log(percent);

		switch(percent) {
			case "0.1":  {
				if (level === 1) return;
				say("now begin");
				level = 1;
				break;
			}
			case "0.3": {
				if (level === 3) return;
				say("on progress"); 
				level = 3;
				break;
			}
			case "0.5": {
				if (level === 5) return;
				say("it's cold here"); 
				level = 5;
				break;
			}
			default {
				if (level === 0) return;
				shutup();
				level = 0;
			}
		}


	}

	var walk = function () {
		person.css('left', (innerWidth - person_w) * (1 - progress) + "px");
		speak();
		// $('.bg-item').css('background-position-x', '+=10px');
	}

	var onProgress = function () {
	    offsetx = win.scrollLeft();
	    progress = offsetx / (total - win.innerWidth());
	    // console.log(progress);    		
	}

	return {
		init: init,
		scrollInit: scrollInit
	}
})()