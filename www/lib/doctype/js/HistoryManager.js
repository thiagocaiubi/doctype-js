var ajaxHistory = {
	'items': [],
	'captions': [],
	'currentIndex': 0,
	'go': function(ref) {
		if(this.items[this.currentIndex + ref] || false) this.currentIndex += ref;
		else return;
		if(this.activeHistory) this.setHash();
		if(this.captions[this.currentIndex]) document.title = this.captions[this.currentIndex];
		new Function(this.items[this.currentIndex])();
	},
	'goTo': function(ind) {
		if(this.items[ind] || false) this.currentIndex = ind;
		else return;
		if(this.activeHistory) this.setHash();
		if(this.captions[this.currentIndex]) document.title = this.captions[this.currentIndex];
		new Function(this.items[this.currentIndex])();
	},
	'add': function(str, cap) {
		if(str == this.items[this.currentIndex]) return false;
		this.currentIndex = this.items.length;
		this.items.push(str);
		this.captions.push(cap || false);
		if(this.activeHistory) this.setHash();
		return true;
	},
	'hasBack': function() { return (this.items[this.currentIndex - 1] || false) ? true : false; },
	'hasForward': function() { return (this.items[this.currentIndex + 1] || false) ? true : false; },
	'activeHistory': false,
	'activateBrowserHistory': function() {
		if(document.all) this.makeIframe();
		else setInterval("ajaxHistory.checkHash()", 100);
		this.activeHistory = true;
	},
	'makeIframe': function() {
		this.iframe = document.createElement('iframe');
		this.iframe.style.display = 'none';
		this.iframe.src = 'historyframe.html';
		document.getElementsByTagName('body')[0].appendChild(this.iframe);
	},
	'checkHash': function() {
		var curHash = location.hash.replace(/#/,'');
		if(this.currentIndex != curHash) this.goTo(curHash);
	},
	'setHash': function() {
		top.location.hash = this.currentIndex;
		if(document.all)
			this.iframe.contentWindow.location.href = 'historyframe.html?'+this.currentIndex;
	}
};