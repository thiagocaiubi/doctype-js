function render(container, url, options){
	options = Object.extend({
		indicator: ""
	}, options || {});
	new Ajax.Updater(container, url, {
		onCreate: function(){ $(options.indicator).show(); },
		onComplete: function(){ $(options.indicator).hide(); }
	});
}