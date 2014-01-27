# gridcolor

The gridcolor plugin is a jQuery plugin to color tiles in a grid. It accepts any number of colors and attempts to use each of them fairly without having two adjacent colors be the same.

## Usage

The gridcolor plugin is fairly easy to use. All it requires is a list of colors and a class that tells it which elements to color.

The simplest example would work with HTML like this:

```html
<div class=".item-container">
	<div class="item">Item 1</div>
	<div class="item">Item 2</div>
	<div class="item">Item 3</div>
	<div class="item">Item 4</div>
	<div class="item">Item 5</div>
</div>
```

This javascript would then make each element with the `.item` be either red, yellow, or blue.

```javascript
$(".item-container").gridcolor({
	itemSelector : ".item",
	colors : ["#ff0000", "#00ff00", "#0000ff"]
});
```

## Configuration

### Options

### The list of colors

The list of colors


## Utility functions

### `hexToRGB`

The gridcolor plugin includes a utility function to convert from hex color values to RGB notation. The function is called `hexToRGB` and can be used as follows:

```javascript
$.gridcolor.hexToRGB("#000000"); // Returns "rgb(0, 0, 0)"
```