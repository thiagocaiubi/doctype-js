Object.extend(Date.prototype, {
	format: function(pattern){
		var formatted = "", pattern = pattern || this.defaultPattern;
		for (var i = 0; i < pattern.length; i++) {
			var char = pattern[i];
			switch (char) {
				case "d": formatted += this.getDate().toPaddedString(2); break;
				case "m": formatted += (this.getMonth() + 1).toPaddedString(2); break;
				case "y": formatted += this.getFullYear().toPaddedString(4); break;
				default: formatted += char;
			}
		}
		return formatted;
	}
});