# gridcolor

The gridcolor plugin is a jQuery plugin to color tiles in a grid. It accepts any number of colors and attempts to use each of them fairly without having two adjacent colors be the same.

## Usage

The gridcolor plugin is fairly easy to use. All it requires is a list of colors and a class that tells it which elements to color.

### Heading 3

Some text

#### Heading 4

Some more text

##### Heading 5

Even more text

###### Heading 6

Final text

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

This javascript would then make each element with the class `.item` be either red, yellow, or blue.

```javascript
$(".item-container").gridcolor({
	itemSelector : ".item",
	colors : ["#ff0000", "#00ff00", "#0000ff"]
});
```

## Configuration

### Options

`colors` - `[ color1, color2, color3, ... ]` See [the list of colors](#the-list-of-colors) for details. The default colors are shades of grey. There are not 50 of them.

`columns` - The number of columns in the grid. This is used to prevent elements from having the same color as those directly above them. Defaults to `3`.

`cssProperty` - The property used to determine if two elements have the same color or not. Defaults to `"background-color"`.

`defaultColor` - When everything goes wrong, this is the object that will be used to color whatever tile is making problems. Defaults to `{ "background-color": "rgb(255, 255, 255)", "color": "rgb(85, 85, 85)" }`.

`itemSelector` - The CSS selector used to find tiles within the element that `$.gridcolor()` is called on. This will be passed to jQuery, so anything accepted by the jQuery object is valid in this option. Defaults to `".item"`.

### The list of colors

The list of colors should be in the following form: `[ <color>, <color>, <color>, ... ]` where each color is either a string or an object.

If a string is passed, it will be converted into an object with the form: `{ cssProperty: string }` where `cssProperty` is the value of that option.

If an object is passed it should be a valid object that can be passed to `$.css()` and should define, at the very least, a value for `cssProperty`.


## Utility functions

### `hexToRGB`

The gridcolor plugin includes a utility function to convert from hex color values to RGB notation. The function is called `hexToRGB` and can be used as follows:

```javascript
$.gridcolor.hexToRGB("#000000"); // Returns "rgb(0, 0, 0)"
```