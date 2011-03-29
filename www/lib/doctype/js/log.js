function log(text){
	var id = "doctype-log", container = ($(id) || new Element("div", {id: id}));
	container.insert(text).insert(new Element("br"));
	if(!$(id)) $$("body").first().insert(container);
}