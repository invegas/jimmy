window.Parallel = (function () {
	var progress = 0, total, innerWidth, person, person_w, win, offsetx;

	var scrollInit = function () {
		// window.scrollTo(0, 0);
		// $(window).scrollLeft(0);
		// document.location.href = "#";
		setTimeout (function () {
			scrollTo(0,0);
		}, 0);
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

	var walk = function () {
		person.css('left', (innerWidth - person_w) * (1 - progress) + "px");
	}

	var onProgress = function () {
	    offsetx = win.scrollLeft();
	    progress = offsetx / (total - win.innerWidth());
	    console.log(progress);    		
	}

	return {
		init: init,
		scrollInit: scrollInit
	}
})()