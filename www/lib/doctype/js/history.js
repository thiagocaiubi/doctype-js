var History = Class.create({
	_iframe: null,
	_index: "",
	_responders: [],
	initialize: function(){
	  	this._createIframe();
	  	this._registerResponders();
		this._y();
	},
	_createIframe: function(){
		this._iframe = new Element("iframe");
		$$("body").first().insert(this._iframe);
	},
	_registerResponders: function(){
		thiz = this;
		Ajax.Responders.register({
	  		onCreate: function(responder) {
	  			thiz._responders.push({
	  				updater: responder,
	  				container: responder.container,
	  				url: responder.url,
	  				options: responder.options
	  			});
	  			thiz._index = thiz._responders.length - 1;
	  			location.hash = thiz._index;
			}
		});
	},
	_y: function(){
		thiz = this;
		new PeriodicalExecuter(function(){
			var hash = location.hash.replace(/#/, '');
			if(thiz._index != hash){
				var responder = thiz._responders[hash];
				if(responder) {
					thiz._index = hash;
					location.hash = thiz._index;
					var container = responder.container, url = responder.url, options = responder.options;
					responder.updater.initialize(container, url, options);
				}
			}
		}, 1);
	}
});
document.observe("dom:loaded", function(){
	new History();
});