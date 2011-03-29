var Loader = Class.create({
	importedCSS: [],
	importedJS: [],
	uiHash: null,
	initialize: function(args){
		this.args = Object.extend({
			onComplete: Prototype.emptyFunction(),
			requireJS: []
		}, args || {});
		this.uiHash = $H(UI);
		thiz = this;
		this.args.requireJS.each(function(object){
			thiz._importDependencies(object);
		});
	},
	_importDependencies: function(object){
		(object.requireCSS || []).each(function(css){
			thiz._importCSS(css.toString().toLowerCase());
		});
		(object.requireJS || []).each(function(js){
			thiz._importDependencies(thiz.uiHash.get(js));
		});
		this._importJS(object.name);
	},
	_importCSS: function(source){
		var fullPath = DocType.contextPath.concat(DocType.cssRoot.concat(source.concat(".css")));
		if($$("link[href='"+source+"']").size() === 0){
			this.importedCSS.push(source);
			$$("title").first().insert({ 
				after: new Element("link", { 
					charset: DocType.charset,
					href:  fullPath,
					rel: "stylesheet",
					type: "text/css"
				})
			});
		}
	},
	_importJS: function(source){
		var fullPath = DocType.contextPath.concat(DocType.jsRoot.concat(source.concat(".js")));
		if ($$("script[src='"+fullPath+"']").size() === 0){
			this._observeLoad(fullPath, source);
			this.importedJS.push(source);
			$$("head").first().insert({ 
				bottom: new Element("script", { 
					charset: DocType.charset,
					src:  fullPath,
					type: "text/javascript"
				})
			});
		}
	},
	_observeLoad: function(fullPath, source){
		document.observe(source.concat(":loaded"), function(){
			if($$("script[src='"+fullPath+"']").size() !== 0){
				thiz.importedJS = thiz.importedJS.without(source);
				if(thiz.importedJS.size() === 0 && Object.isFunction(thiz.args.onComplete)) {
					thiz.args.onComplete();
				}
			}
		});
	}
});
var UI = {
	Button: {
		name: "button",
		requireCSS: ["button"],
		requireJS: ["Element"]
	},
	Calendar: {
		name: "calendar",
		requireCSS: ["calendar"]
	},
	CPF: {
		name: "cpf"
	},
	Date: {
		name: "date"
	},
	Element: {
		name: "element"
	},
	Input: {
		name: "input",
		requireCSS: ["input"]
	},
	Keyboard: {
		name: "keyboard"
	},
	NumberInput: {
		name: "numberinput",
		requireJS: ["Input"]
	},
	CPFInput: {
		name: "cpfinput",
		requireJS: ["NumberInput", "Input", "CPF"]
	},
	Grid: {
		name: "grid",
		requireCSS: ["grid"],
		requireJS: ["Parser"]
	},
	Parser: {
		name: "parser"
	},
	Tabs: {
		name: "tabs",
		requireCSS: ["tabs"]
	}
};