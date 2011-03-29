var Overlay = {
	hide: function(){
		this.overlay.hide();
		this._setOverflow("");
	},
	show: function(style){
		this._initialize(style);
		this.overlay.show();
		this._setOverflow("hidden");
	},
	_initialize: function(style){
		this._body = $$("body").first(); 
		this._html = $$("html").first();
		if ($("overlay")) {
			this.overlay = $("overlay");
		} else {
			var opacity = style ? style.opacity : .5;
			this._style = Object.extend({
				backgroundColor: "white",
				display: "none",
				filter: "alpha(opacity="+opacity*100+")",
				height: "110%",
				left: "0px",
				margin: "0px",
				opacity: opacity+"",
				position: "absolute",
				top: "0px",
				visibility: "visible",
				width: "110%",
				zIndex: "999"
			}, style || {});
			this.overlay = new Element("div", {id: "overlay"}).setStyle(this._style);
			this._body.insert(this.overlay);
		}
		if(this._style) this.overlay.setStyle(style);
	},
	_setOverflow: function(of){
		[this._body, this._html].invoke("setStyle", { overflow: of });
	}
};
document.fire("overlay:loaded");