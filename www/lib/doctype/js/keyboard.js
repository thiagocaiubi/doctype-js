var Keyboard = Class.create({
	initialize: function(container, input, options){
		this.container = $(container);
		this.input = $(input);
		this.options = Object.extend({
			maxlength: null
		}, options || {});
		this._createStructure();
	},
	_createStructure: function(){
		var table = new Element("table"), thead = new Element("thead"), 
		tbody = new Element("tbody"), tfoot = new Element("tfoot");
		for (var i = 0; i < 12; i++) {
			if (i % 3 === 0) {
				tr = new Element("tr");
				tbody.insert(tr);
			}
			thiz = this;
			var td = new Element("td").update(i).observe("click", function(){
				if(thiz.options.maxlength >= thiz.input.getValue().length){
					thiz.input.setValue(thiz.input.getValue() + this.innerHTML);
				}
			});
			tr.insert(td);
		}
		table.insert(thead).insert(tbody).insert(tfoot);
		this.container.insert(table);
	}
});
document.fire("keyboard:loaded");