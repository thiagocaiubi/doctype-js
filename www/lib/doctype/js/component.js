var Component = Class.create({
	initialize: function(element, options){
		this.element = $(element);
		this.options = Object.extend({
			className: "",
			listeners: { }
		}, options || { });
		this._setCLass();
		this._setListeners();
	},
	_setCLass: function(){
		this.element.addClassName(this.options.className);
	},
	_setListeners: function(){
		component = this;
		$H(this.options.listeners).each(function(entry){
			if (Object.isFunction(entry.value))
				component.element.observe(entry.key.toLowerCase().substring(2), entry.value.bindAsEventListener(component));
		});
	}
});