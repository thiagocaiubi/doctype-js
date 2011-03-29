var Button = Class.create({
	initialize: function(element, options){
		this.element = $(element);
		this.options = Object.extend({
			label: "Button",
			observers: {}
		}, options || {});
		this.element.update(this.options.label).addObservers(this.options.observers);
	}
});
document.fire("button:loaded");