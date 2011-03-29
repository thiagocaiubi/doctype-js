var DDBG = Class.create({
	initialize: function(options){
		this._body = $$("body").first();
		this._html = $$("html").first();
		this._options = Object.extend({
		}, options || {});
		this._createContainer();
		this._observeDragAndDrop();
		this._setOverflow();
	}, 
	_createContainer: function(){
		var dim = document.viewport.getDimensions(); 
		this.container = new Element("div").addClassName("ddbg").setStyle({
			height: "100000px",
			width: "100000px"
		});
		this._body.insert(this.container);
	},
	_observeDragAndDrop: function(){
		new Draggable(this.container);
	},
	_setOverflow: function(){
		[this._body, this._html].invoke("setStyle", {overflow: "hidden"});
	}
});