document.observe("dom:loaded", function(){
	var dim = document.viewport.getDimensions(), h = dim.height, w = dim.width;
	new PeriodicalExecuter(function(){
		var dim = document.viewport.getDimensions();
	 	if (h != dim.height || w != dim.width){
	 		h = dim.height; 
	 		w = dim.width;
			document.fire("viewport:resize");
		}
	}, 1);
});