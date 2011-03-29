var Parser = {
	parse: function(string){
		var result = string;
		$H(ParserHandler).values().each(function(parser, index){
			if (new RegExp(parser.regExp).test(string)) {
				result = parser.handler.apply(null, [string]);
				throw $break;
			}
		});
		return result;
	}
};
var ParserHandler = {
	date: {
		regExp: "^\\d{2}/\\d{2}/\\d{4}$",
		handler: function(string){
			var arr = string.split("/"), 
				year = new Number(arr[2]), month = new Number(arr[1]), dayOfMonth = new Number(arr[0]),
				date = new Date(year, month - 1, dayOfMonth);
			if (date.getUTCFullYear() != year || date.getUTCMonth() + 1 != month || date.getUTCDate() != dayOfMonth) 
				return string;
			return date;
		}
	},
	dateTime: {
		regExp: "^\\d{2}/\\d{2}/\\d{4}\\s+\\d{2}:\\d{2}:\\d{2}$",
		handler: function(string){
			var split = new RegExp("\\s+").exec(string), dateTimeArray = string.split(split);
			var timeArray = dateTimeArray[1].split(":"), hours = timeArray[0], minutes = timeArray[1], seconds = timeArray[2];
			var date = ParserHandler.date.handler.apply(null, [dateTimeArray[0]]);
			date.setHours(hours); 
			date.setMinutes(minutes); 
			date.setSeconds(seconds);
			if (date.getHours() != hours || date.getMinutes() != minutes || date.getSeconds() != seconds) 
				return string;
			return date;
		}
	},
	money: {
		regExp: "^R\\$\\s+(\\d{1,3}(\\.\\d{3})+|\\d{1,3}),\\d{2}$",
		handler: function(string){
			var split = new RegExp("\\s+").exec(string), amount = string.split(split)[1];
			return new Number(amount.replace(".", "").replace(",", "."));
		}
	}
};
document.fire("parser:loaded");