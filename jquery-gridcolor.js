(function($) {
	$.fn.gridcolor = function(options) {
		
		// Sanitize options
		var settings = $.extend({}, $.fn.gridcolor.defaults, options);
		settings.columns = parseInt(settings.columns);
		
		for(var h = 0; h < settings.colors.length; h++) {
			if(typeof(settings.colors[h]) != "object") {
				
				// Convert each string to an object that can be passed to $.css();
				if(typeof(settings.colors[h]) != "string") {
					settings.colors[h] = settings.defaultColor;
				}
				else if(settings.colors[h].charAt(0) == '#') {
					settings.colors[h] = {};
					settings.colors[h][settings.cssProperty] = $.fn.gridcolor.hexToRGB(settings.colors[h].slice(1));
				}
				else {
					settings.colors[h] = {};
					settings.colors[h][settings.cssProperty] = settings.colors[h];
				}
			}
			else {
				
				// Standardize all object values to rgb(red, green, blue) format
				for(prop in settings.colors[h]) {
					if(settings.colors[h].hasOwnProperty(prop)) {
						
						if(settings.colors[h][prop].charAt(0) == '#') {
							settings.colors[h][prop] = $.fn.gridcolor.hexToRGB(settings.colors[h][prop].slice(1));
						}
					}
				}
			}
			
		}
		
		return this.each(function() {
			$items = $(this).children(settings.itemSelector);
			
			$items.each(function(index, element) {
				
				var color;
				
				for(var c = 0; c < settings.colors.length; c++) {
					
					// Pick a color from the list
					color = settings.colors[c];
					
					// Check to see if that color can be used
					if($items.eq(index - 1).css(settings.cssProperty) == color[settings.cssProperty] || $items.eq(index - settings.columns).css(settings.cssProperty) == color[settings.cssProperty]) {
						continue;
					}
					else {
						// If it works, use it
						$(element).css(color);
						
						// Rotate the list of colors
						settings.colors.push(settings.colors.shift());
						return true;
					}
				}
				
				// If no color works, use a random selection
				color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
				$(element).css(color);
				
				// Rotate the list of colors
				settings.colors.push(settings.colors.shift());
				
			});
		});
		
	};
	
	
	$.fn.gridcolor.defaults = {
		colors : ["#777777", "#999999", "#bbbbbb", "#555555"],
		columns : 3,
		cssProperty : "background-color",
		defaultColor : {
			"background-color" : "rgb(255, 255, 255)",
			"color" : "rgb(85, 85, 85)"
		},
		itemSelector : ".item"
	};
	
	$.fn.gridcolor.hexToRGB = function(hex) {
		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		
		return "rgb(" + r + ", " + g + ", " + b + ")";
	};
}(jQuery));