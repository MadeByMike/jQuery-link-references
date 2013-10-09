(function ($) {
	$.linkReferences = function (el, scope, options) {
		var linkRef = this,refExpanded, refExists; 
		linkRef.$el = $(el);
		linkRef.$links = "";
		var linkReferences = [true]; // first item in the array intentionally not used

		if (typeof(scope) == "undefined" || scope == null) {
			scope = document.body;
		}
		if (typeof(options) == "undefined" || options == null) {
			options = '';
		}

		linkRef.init = function () {
			$.extend(options, linkRef.$el.data());
			for (var key in options) {
				if (options.hasOwnProperty(key)) {
					if (options[key] === "") {
						delete options[key];
					}
				}
			}
			linkRef.options = $.extend({}, $.linkReferences.defaultOptions, options);

			if ($(scope).find(linkRef.options.containers).find('a[href]').length > linkRef.options.maxLinks) {
				return false;
			}
			linkRef.$links = $(scope).find(linkRef.options.containers).find('a[href]').filter(function () {
					if ($(this).is("[href^='javascript:']")) {
						return false;
					}
					if (linkRef.options.ignoreContainers !== false) {
						if ($(this).closest(linkRef.options.ignoreContainers).length > 0) {
							return false;
						}
						if ($(this).is(linkRef.options.ignoreContainers)) {
							return false;
						}
					}
					if (($(this).attr('href').indexOf("#") === 0) || ($(this).attr('href').indexOf(window.location.pathname + '#') != -1)) {
						return false;
					}
					return true;
				});

			linkRef.$links.each(function () {
				if ($(this).is("[href^='mailto:']")) {
					// email address, display differently and strip things like ?subject=
					refExpanded = 'Email: ' + String($(this).attr('href')).replace(/^mailto:/, '').replace(/\?.*$/, '');
				} else {
					// any other link (use .prop to get absolute)
					refExpanded = $(this).prop('href');
				}
				refExists = $.inArray(refExpanded, linkReferences);
				if (refExists > 0) {
					// we've already found this link
					$(this).after('<sup class="'+linkRef.options.supClass+'">[' + refExists + ']<\/sup>');
				} else {
					// this is a new link
					$(this).after('<sup class="'+linkRef.options.supClass+'">[' + linkReferences.length + ']<\/sup>');
					linkReferences[linkReferences.length] = refExpanded;
				}
			});

			if (linkReferences.length > 1) {
				var html = '';
				if(linkRef.options.before){
					html += linkRef.options.before;
				}
				html += '<ol class="'+linkRef.options.listClass+'">';
				for (var i = 1, j = linkReferences.length; i < j; i++) { // purposefully start at 1 to make the numbers line up
					html += '<li>' + String(linkReferences[i]).replace(/\//g, '/<span class="linkspacer"> </span>') + '</li>';
				}
				html += '<\/ol>';
				linkRef.$el.append(html);
			}
		};
		
		return linkRef.init(scope, options);

	};

	$.linkReferences.defaultOptions = {
		containers : '*', // this is where this script looks for links
		ignoreContainers : false, // the script will ignore links found in these containers
		before : '<h2>Link references<\/h2>', 
		listClass : 'link-refs',
		supClass : 'link-ref',
		maxLinks : 1000 // this is the maximum amount of links to check - adjust to prevent timeouts in pages with lots of links
	};

	$.fn.linkReferences = function (scope, options) {
		return this.each(function () {
			var linkRef = new $.linkReferences(this, scope, options);
		});
	};

})(jQuery);