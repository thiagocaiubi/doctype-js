var Timer = Class.create({ 
	initialize: function() { 
		this.startTime = new Date().valueOf(); 
	}, 
	end: function() { 
		var endTime = new Date().valueOf(); 
		return (endTime - this.startTime).toString().concat(" ms"); 
	}
});