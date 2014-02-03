(function($) {
	$.fn.gridcolor = function(options) {
		
		// Sanitize options
		var settings = $.extend({}, $.fn.gridcolor.defaults, options);
		settings.columns = parseInt(settings.columns);
		
		if(!settings.classMode) {
			for(var h = 0; h < settings.colors.length; h++) {
				if(typeof(settings.colors[h]) != "object") {
					
					// Convert each string to an object that can be passed to $.css();
					if(typeof(settings.colors[h]) != "string") {
						settings.colors[h] = settings.defaultColor;
					}
					else if(settings.colors[h].charAt(0) == '#') {
						var obj = {};
						obj[settings.cssProperty] = $.fn.gridcolor.hexToRGB(settings.colors[h].slice(1));
						settings.colors[h] = obj;
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
		}
		
		return this.each(function() {
			$items = $(this).children(settings.itemSelector);
			
			$items.each(function(index, element) {
				
				var color;
				var left;
				var above;
				
				for(var c = 0; c < settings.colors.length; c++) {
					
					// Pick a color from the list
					color = settings.colors[c];
					
					left = index - 1;
					above = index - settings.columns;
					
					// Check to see if that color can be used
					if(settings.classMode) {
						// If this class matches the class to the left, keep looking
						if(index % settings.columns != 0 && left >= 0 && $items.eq(left).hasClass(color)) {
							continue;
						}
						
						// If this class matches the class above, keep looking
						else if(above >= 0 && $items.eq(above).hasClass(color)) {
							continue;
						}
						
						// If it works, use it
						else {
							$(element).addClass(color);
							
							// Rotate the list of classes
							settings.colors.push(settings.colors.shift());
							return true;
						}
					}
					else {
						
						// If this color matches the color to the left, keep looking
						if(left >= 0 && $items.eq(left).css(settings.cssProperty) == color[settings.cssProperty]) {
							continue;
						}
						
						// If this color matches the color above, keep looking
						else if(above >= 0 && $items.eq(above).css(settings.cssProperty) == color[settings.cssProperty]) {
							continue;
						}
						
						// If it works, use it
						else {
							$(element).css(color);
							
							// Rotate the list of colors
							settings.colors.push(settings.colors.shift());
							return true;
						}
					}
				}
				
				// If no color works, use a random selection
				color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
				if(settings.classMode) {
					$(element).addCLass(color);
				}
				else {
					$(element).css(color);
				}
				
				// Rotate the list of colors
				settings.colors.push(settings.colors.shift());
				
			});
		});
		
	};
	
	
	$.fn.gridcolor.defaults = {
		classMode : false,
		colors : [ "#777777", "#999999", "#bbbbbb", "#555555" ],
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