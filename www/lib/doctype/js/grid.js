var Grid = Class.create({
	initialize: function(element, options){
		this.element = $(element).addClassName("grid");
		this.options = Object.extend({
			sortable: false
		}, options || {});
		this._alternateRowsColors();
		if(this.options.sortable) this._sortable();
	},
	_alternateRowsColors: function(){
		this.element.select("tbody tr").each(function(row){ row.className = ""; });
		this.element.select("tbody tr:nth-child(2n+1)").invoke("addClassName", "odd");
		this.element.select("tbody tr:nth-child(2n)").invoke("addClassName", "even");
	},
	_sort: function(event){
		event.stop();
		var a = Event.element(event);
		var rows = this.element.select("tbody tr").sortBy(function(row, index){
			if (index == 0) firstRow = row;
			return Parser.parse(row.select("td")[a.readAttribute("name")].innerHTML);
		});
		if (rows.first() == firstRow) rows.reverse();
		grid = this;
		rows.each(function(row){
			grid.element.select("tbody").first().insert(row);
		});
		this._alternateRowsColors();
	},
	_sortable: function(){
		grid = this;
		this.element.select("thead tr th").each(function(header, index){
			var a = new Element("a", { href: "#" })
				.update(header.innerHTML)
				.writeAttribute("name", index)
				.observe("click", grid._sort.bindAsEventListener(grid));
			header.update("").insert(a);
		});
	}
});