Element.addMethods({
	addObservers: function(element, observers){
		$H(observers || {}).each(function(observer){
			var eventName = observer.key, handler = observer.value;
			if(Object.isString(eventName) && Object.isFunction(handler)){
				element.observe(eventName, handler);
			}
		});
		return element;
	}
});
document.fire("element:loaded");