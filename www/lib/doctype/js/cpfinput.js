var CPFInput = Class.create(NumberInput, {
	initialize: function($super, element, options){
		$super(element, options);
		this.element = $(element)
			.observe("keyup", this._onKeyUp.bindAsEventListener(this));
	},
	_onKeyUp: function(){
		var value = this.element.getValue();
		if(value.length == 11){
			 value.isCPF() ? this.element.removeClassName("inputError") : this.element.addClassName("inputError");
		}
	}
});
document.fire("cpfinput:loaded");