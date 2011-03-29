var Input = Class.create({
	initialize: function(element, options){
		this.options = Object.extend({
			attributes: {},
			handlers: {}
		}, options || {});
		this.element = $(element).addClassName("input").writeAttribute(this.options.attributes);
		thiz = this;
		$H(this.options.handlers).each(function(handler){
			//.observe("keypress", this._onKeyPress.bindAsEventListener(this));
			console.log(new RegExp("on*").exec(handler.key) +" -> "+ handler.value);
			thiz.element.observe(handler.key, handler.value.bindAsEventListener(thiz));
			console.log(handler.key +" -> "+ handler.value);
		});
	}
});
document.fire("input:loaded"); 