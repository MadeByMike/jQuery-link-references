jQuery link references
======================

A quick jQuery plugin to generate a list of link references. Generally good for showing in a print stylesheet. 

If you're only interested in a quick alternative there is a neat trick for doing this using only css:

@media print{
       a:after{content:" (" attr(href) ") "; font-size:0.8em; font-weight:normal;}
}

The css method has some limitations. It only works in browsers supporting media queries, psudo elements and attribute selectors. It will also only display the references inline with the content.

This plugin will generate an ordered list inside a target element.

Example
-------
```
$('.print-only').linkReferences()
```
