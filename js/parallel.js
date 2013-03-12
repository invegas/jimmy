window.Parallel = (function () {
	var progress = 0, total, innerWidth, person, win, offsetx;

	var scrollInit = function () {
		// $(window).scrollLeft(0);
		document.location.href = "#";
	}	

	var initSetting = function (cfg) {
		win = cfg.win;
		person = cfg.person;
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
		person.css('left', (innerWidth - 50) * (1 - progress) + "px");
	}

	var onProgress = function () {
	    offsetx = win.scrollLeft();
	    progress = offsetx / (total - win.innerWidth());
	    console.log(progress);    		
	}

	return {
		init: init
	}
})()