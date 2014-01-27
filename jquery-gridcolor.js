

var gridLayoutDefaults = {
	columns : 3,
	container : ".item-container",
	itemSelector : ".item",
	gutter : 30
}

function gridLayout(options)
{
	options = $.extend({}, gridLayoutDefaults, options);
	
	options["columns"] = parseInt(options["columns"]);
	options["gutter"] = parseInt(options["gutter"]);
	
	$items = $(options["container"]).children(options["itemSelector"]).css("margin", 0);
	
	var columnHeights = [];
	var xOffset = parseInt($items.first().outerWidth()) + options.gutter;
	
	
	for(var c = 0; c < options.columns; c++) {
		columnHeights[c] = 0;
	}
	
	$items.each(function(index, element) {
		
		// Find which column to put this item in
		var column = keyOfLowest(columnHeights);
		
		// Position the item in the column
		$(element).css("position", "absolute");
		$(element).css("top", toCSSMeasurement(columnHeights[column]));
		$(element).css("left", toCSSMeasurement(xOffset * column));
		
		// Update column heights array
		columnHeights[column] += $(element).outerHeight() + options.gutter;
	});
}


function keyOfLowest(array) {
	return array.indexOf(Math.min.apply(Math, array));
}


function toCSSMeasurement(value) {
	if(typeof(value) == "number") {
		return value + "px";
	}
	else {
		return value;
	}
}



var colorGridDefaults = {
	colors : ["#777777", "#999999", "#bbbbbb"],
	columns : 3,
	container : ".item-container",
	cssProperty : "background-color",
	itemSelector : ".item"
}

function colorGrid(options)
{
	options = $.extend({}, colorGridDefaults, options);
	
	options["columns"] = parseInt(options["columns"]);
	for(var h = 0; h < options.colors.length; h++) {
		if(options.colors[h].charAt(0) == '#') {
			options.colors[h] = hexToRGB(options.colors[h].slice(1));
		}
	}
	
	$items = $(options.container).children(options.itemSelector);
	
	$items.each(function(index, element) {
		
		var color;
		for(var c = 0; c < options.colors.length; c++) {
			// Pick a color from the list
			color = options.colors[c];
			console.log("considering color " + color + " for element " + index);
			
			// Check to see if that color can be used.
			console.log("left: " + $items.eq(index - 1).css(options.cssProperty));
			console.log("above: " + $items.eq(index - options.columns).css(options.cssProperty));
			if($items.eq(index - 1).css(options.cssProperty) == color || $items.eq(index - options.columns).css(options.cssProperty) == color) {
				continue;
			}
			else {
				// If it works, use it
				$(element).css(options.cssProperty, color);
				console.log("using color " + color + " for element " + index);
				options.colors.push(options.colors.shift());
				return true;
			}
		}
		
		// If no color works, use a random selection
		color = options.colors[Math.floor(Math.random() * options.colors.length)];
		console.log("random selection: " + color);
		$(element).css(options.cssProperty, color);
		options.colors.push(options.colors.shift());
	});
}


function hexToRGB(hex) {
	
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    
    console.log(hex + " => " + "rgb(" + r + ", " + g + ", " + b + ")");
    
    return "rgb(" + r + ", " + g + ", " + b + ")";
}



$(document).ready(function(e) {
	var colors = ["#14A697", "#F2C12E", "#F29D35", "#F25252"];
	var colors2 = ["#00AAB5", "#C9E000", "#ED4200", "eeeeee"];
	
	gridLayout({
		container : "#content-wrapper",
		columns : 3,
		itemSelector : ".entry",
		gutter : 30
	});
	
	colorGrid({
		colors : colors2,
		columns : 3,
		container : "#content-wrapper",
		cssProperty : "background-color",
		itemSelector : ".entry"
	})
});