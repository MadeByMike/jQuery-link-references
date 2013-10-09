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
options = {
       containers : '*', // this is where this script looks for links
       ignoreContainers : false, // the script will ignore links found in these containers
       before : '<h2>Link references<\/h2>', // A title for the link references
       listClass : 'link-refs', // A class added to the ol
       supClass : 'link-ref', // Added to the numbered the references within the contnet
       maxLinks : 1000 // this is the maximum amount of links to check - adjust to prevent timeouts in pages with lots of links
}

$('.print-only').linkReferences(scope,options); 
```

