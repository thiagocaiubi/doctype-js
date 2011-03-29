var Calendar = Class.create({
	_oneDayMilis: 86400000,
	initialize: function(container, options){
		this.container = $(container);
		this.options = Object.extend({
			date: new Date(),
			firstWeekDay: 0,
			locale: {
				caption: "Calendar",
				days: ["S", "M", "T", "W", "T", "F", "S"],
				months: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
				today: "Today"
			}
		}, options || { });
		this._createCalendar();
	},
	setCalendar: function(event, date){
		var args = $A(arguments);
		if (args.size() === 2) args.first().stop();
		date = args.last();
		this._monthIndex = date.getMonth();
		this._month.update(this.options.locale.months[this._monthIndex]);
		this._year.update(date.getFullYear());
		this._tbody.childElements().invoke("remove");
		this._setDates(date);
		this._setMonthHandler(this._previousMonth, date, -1);
		this._setMonthHandler(this._nextMonth, date, 1);
		this._setYearHandler(this._previousYear, date, -1);
		this._setYearHandler(this._nextYear, date, 1);
	},
	_createCalendar: function(){
		var table = this._new("table").addClassName("calendar"), 
			caption = this._new("caption").update(this.options.locale.caption), 
			thead = this._new("thead"), tfoot = this._new("tfoot");
			thead.insert(this._createMonthAndYear()).insert(this._createDays());
		this._tbody = this._new("tbody");
		tfoot.insert(this._setToday());
		this.container.update("").insert(table.insert(caption).insert(thead).insert(this._tbody).insert(tfoot));
		this.setCalendar(this.options.date);
	},
	_createDays: function(){
		var days = this.options.locale.days, firstWeekDay = this.options.firstWeekDay, tr = this._new("tr");
		for (var i = 0; i < days.length; i++) {
			tr.insert(this._new("th").update(days[firstWeekDay] || days[0]));
			firstWeekDay++;
		}
		return tr; 
	},
	_createMonthAndYear: function(){
		this._previousMonth = this._new("a", { href: "#" }).update("&lt;");
		this._nextMonth = this._new("a", { href: "#" }).update("&gt;");
		this._month = this._new("span");
		this._previousYear  = this._new("a", { href: "#" }).update("&lt;&lt;");
		this._nextYear  = this._new("a", { href: "#" }).update("&gt;&gt;");
		this._year = this._new("span");
		return this._new("tr").addClassName("monthAndYear")
			.insert(this._new("th").insert(this._previousYear))
			.insert(this._new("th").insert(this._previousMonth))
			.insert(this._new("th", { colspan: "3" })
				.insert(this._month)
				.insert(this._new("span").update(", "))
				.insert(this._year))
			.insert(this._new("th").insert(this._nextMonth))
			.insert(this._new("th").insert(this._nextYear));
	},
	_isToday: function(today, date){
		return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate();
	},
	_new: function(tagName, attributes){
		return new Element(tagName, attributes);
	},
	_onDateClick: function(event){
		event.stop();
		this.options.onDateClick(new Date(this._year.innerHTML, this._monthIndex, Event.element(event).innerHTML));
	},
	_setDates: function(date){
		var d = new Date(date.getFullYear(), date.getMonth(), 1), today = new Date(), tr;
		if (d.getDay() !== this.options.firstWeekDay) d.setTime(d.getTime() - (d.getDay() - this.options.firstWeekDay).abs() * this._oneDayMilis);
		for (var i = 0; i <= 42; i++) {
			if (i % 7 === 0) {
				tr = this._new("tr");
				this._tbody.insert(tr);
			}
			var td = this._new("td", { align: "center" });
			if (this.options.onDateClick) td.insert(this._new("a", { href: "#" }).update(d.getDate()).observe("click", this._onDateClick.bindAsEventListener(this)));
			else td.update(d.getDate());
			if (date.getMonth() !== d.getMonth()) td.addClassName("outsideMonth").update(d.getDate());
			else if (this._isToday(today, d)) td.addClassName("today");
			else td.addClassName("insideMonth");
			tr.insert(td);
			d.setTime(d.getTime() + this._oneDayMilis);
		}
	},
	_setMonthHandler: function(a, date, decinc){
		var d = new Date(date.getTime());
		d.setMonth(d.getMonth() + decinc);
		return a.stopObserving().observe("click", this.setCalendar.bindAsEventListener(this, d));
	},
	_setToday: function(){
		return this._new("tr")
			.insert(this._new("td", { align: "center", colspan: "7" })
				.insert(this._new("button").update(this.options.locale.today).observe("click", this.setCalendar.bindAsEventListener(this, new Date()))));
	},
	_setYearHandler: function(a, date, decinc){
		var d = new Date(date.getTime());
		d.setFullYear(d.getFullYear() + decinc);
		return a.stopObserving().observe("click", this.setCalendar.bindAsEventListener(this, d));
	}
});
document.fire("calendar:loaded");