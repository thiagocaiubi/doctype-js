 var NumberInput = Class.create(Input, {
	initialize: function($super, element, options){
		$super(element, options);
		this.element = $(element)
			.observe("keypress", this._onKeyPress.bindAsEventListener(this))
			.observe("keyup", this._onKeyUpBlur.bindAsEventListener(this))
			.observe("blur", this._onKeyUpBlur.bindAsEventListener(this));
	},
	_isControlKey: function(which){
		switch(which){
			case Event.KEY_BACKSPACE:
			case Event.KEY_DELETE:
			case Event.KEY_END:
			case Event.KEY_HOME:
			case Event.KEY_LEFT:
			case Event.KEY_RETURN:
			case Event.KEY_RIGHT:
			case Event.KEY_TAB: return true; break;
			default: return false;
	    }
	},
	_isNumberKey: function(which){
		return this._numbers(String.fromCharCode(which)) != null;
	},
	_isValidKey: function(which){
		return this._isNumberKey(which) || this._isControlKey(which);
	},
	_onKeyPress: function(event){
		if (!this._isValidKey(event.which)) event.stop();
	},
	_onKeyUpBlur: function(){
		this._numbersOnly();
	},
	_numbers: function(string){
		return new RegExp("\\d+").exec(string);
	},
	_numbersOnly: function(){
		var value = this.element.getValue(), numbers = this._numbers(value);
		if (numbers != null && numbers.length != value.length) this.element.setValue(numbers);
	}
});
document.fire("numberinput:loaded");