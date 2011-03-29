var Message = Class.create({
	initialize: function(message, level, options){
		this.options = Object.extend({
			onCancel: function(){},
			onConfirm: function(){}
		}, options || {});
		Overlay.show({opacity: .3});
		this._createContainer(message, level);
		this._observeClose();
	},
	_createContainer: function(message, level){
		this.container = new Element("div").addClassName("message").addClassName(level).insert(new Element("div").addClassName("icon"));
		var msg = new Element("div").update(message),
		action = new Element("div").addClassName("action")
			.insert(new Element("button").update("Ok")
					.observe("click", this._onConfirm.bindAsEventListener(this)));
		if(level == Level.QUESTION) {
			action.insert({
				top: new Element("button")
					.update("Cancel")
					.observe("click", this._onCancel.bindAsEventListener(this))
			});
		}
		$$("body").first().insert(this.container.insert(msg).insert(action));
	},
	_observeClose: function(){
		var thiz = this;
		document.observe("keydown", function(event){
			if(Event.KEY_ESC === event.keyCode) thiz._finalli();
		});
	},
	_onCancel: function(){
		this.options.onCancel();
		this._finalli();
	},
	_onConfirm: function(){
		this.options.onConfirm();
		this._finalli();
	},
	_finalli: function(){
		this.container.remove();
		Overlay.hide();
	}
});
var Level = {
	ERROR: "error",
	INFORMATION: "information",
	QUESTION: "question",
	WARNING: "warning"
};