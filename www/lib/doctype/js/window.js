var Window = Class.create({
	initialize: function(options){
		Overlay.show();
		this.options = Object.extend({
			resize: true
		}, options || {});
		var container = new Element("div").addClassName("window").update(this.options.content);
		this._setPosition(container);
		var title = new Element("h3").addClassName("title").update(this.options.title);
		var close = new Element("span").addClassName("close").update("Close");
		close.observe("click", this._close.bindAsEventListener(this, container));
		container.insert(title.insert(close));
		$$("body").first().insert(container);
		var thiz = this;
		if(this.options.resize){
			document.observe("viewport:resize", function(){
				thiz._setPosition(container);
			});
		}
	},
	_setPosition: function(container){
		var dim = document.viewport.getDimensions(), 
			left = dim.width * .2, width = dim.width - left, 
			top = dim.height * .2, height = dim.height - top;
		container.setStyle({
				height: height+"px",
				left: (left / 2)+"px",
				position: "absolute",
				overflow: "auto",
				top: (top / 2)+"px",
				width: width+"px",
				zIndex: "1000"
			});
	},
	_close: function(){
		$A(arguments).last().remove();
		Overlay.hide();
	}
});