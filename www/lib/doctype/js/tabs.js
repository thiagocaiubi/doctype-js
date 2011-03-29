var Tabs = Class.create({
	_a: [],
	initialize: function(element, tabs){
		_element = $(element).addClassName("tabs");
		_container = new Element("div");
		_container.identify();
		_ul = new Element("ul");
		_element.update("").insert(_ul).insert(_container);
		if (!Object.isUndefined(tabs)) this.add(tabs);
	},
	add: function(tabs){
		thiz = this;
		$H(tabs).each(function(entry){
			var a = new Element("a", { href: "#", title: entry.title || entry.key }).addClassName("inactiveTab").update(entry.key);
			a.observe("click", thiz._active.bindAsEventListener(thiz, a, entry.value));
			thiz._a.push(a);
			_ul.insert(new Element("li").insert(a));
			if(entry.value.active) {
				thiz._active(null, a, entry.value);
			}
		});
	},
	_active: function(event, tab, options){
		if (event) event.stop();
		var afterUpdate = options.afterUpdate || Prototype.emptyFunction;
		if (Object.isFunction(options.beforeUpdate)) { 
			options.beforeUpdate(tab);
		}
		if (options.content) {
			_container.update(options.content);
			afterUpdate(tab);
		} else if (options.requestContent) {
			this._requestContent(options.requestContent, afterUpdate, tab);
		}
		_element.select("ul > li > a").without(tab).each(function(value){ value.className = ""; }).invoke("addClassName", "inactiveTab");
		var bgColor = tab.addClassName(options.activeClass || "activeTab").getStyle("backgroundColor");
		_ul.setStyle({ borderColor: bgColor });
		_container.setStyle({ borderColor: bgColor });
	},
	_requestContent: function(requestContent, afterUpdate, tab){
		var options = $H({
			onLoading: function(){},
			onComplete: function(){
				afterUpdate(tab);
			}
		});
		options.set("parameters", requestContent.parameters);
		options.set("evalScripts", true);
		new Ajax.Updater(_container, requestContent.url, options.toObject());
	}
});
document.fire("tabs:loaded");