
Make sure that these items are handled before resubmitting project!

index.html

1. Fix the links for media type ([Media Types](http://reference.sitepoint.com/html/link/media))

```html
<link rel="stylesheet" href="basic.css" media="screen"/>
<link rel="stylesheet" href="print.css" media="print"/>
```

2. Put "printmedia" back into html.

3. Move Google Fonts setup into Javascript

```javascript
<script src="http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
<script type="text/javascript">
  WebFont.load({
    google: {
      families: ['Cantarell']
    }
  });
</script>
<style type="text/css">
  .wf-loading h1 { visibility: hidden; }
  .wf-active h1, .wf-inactive h1 { 
    visibility: visible; font-family: 'Cantarell'; 
  }
</style>

```

main.js

1. Add comment and readme.md entry about "pizzaDiv" querySelector change in "main.js" line 464

2. Take "Var Phase" out of the loop on line 505 of "Main.js"

3. Use getElementByID on line 547 for "#movingPizzas"and take it out of the loop by setting the selector to a variable and using the variable to appendChild.

4. Use Strict




