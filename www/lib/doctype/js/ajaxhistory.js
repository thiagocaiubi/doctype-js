Ajax.History = Class.create({
	initialize: function(){
		this._responders = [];
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
	  			thiz._responders.push(responder);
	  			thiz._index = thiz._responders.length - 1;
	  			location.hash = thiz._index;
			}
		});
	},
	_y: function(){
		thiz = this;
		new PeriodicalExecuter(function(){
			var hash = location.hash.replace(/#/, '');
			if(hash && thiz._index != hash){
				var responder = thiz._responders[hash];
				thiz._responders = thiz._responders.without(responder);
				console.log(responder);
				responder._complete = false;
				responder.initialize(responder.container, responder.url, responder.options);
			}
		}, 1);
	}
});
document.observe("dom:loaded", function(){
	new Ajax.History();
});