function bindFormChecks() {
2 $$('form').invoke('observe', 'submit', checkForm);
3}
4
5var gEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
6
7function checkForm(e) {
8 var firstOffender = null, that = this;
9 function checkError(fieldOK, field, className, message) {
10 var label = $$('label[for="' + field.id + '"]').first(), errorZone = field.next('.errorZone');
11 if (fieldOK) {
12 field.removeClassName(className);
13 label && label.removeClassName(className);
14 errorZone.hide().update('');
15 } else {
16 e.stop();
17 field.addClassName(className);
18 label && label.addClassName(className);
19 firstOffender = firstOffender || field;
20 errorZone.update(message).show();
21 }
22 }
23 // Required fields
24 this.select('*[id*=Req]').each(function(field) {
25 checkError(field.present(), field, 'missing', 'Value required!');
26 });
27 // E-mail fields
28 this.select('*[id*=Email]').each(function(field) {
29 if (field.hasClassName('missing')) return;
30 checkError(gEmailRegex.test(field.getValue()), field, 'badEmail', 'This is not a valid e-mail address.');
31 });
32 if (firstOffender) {
33 firstOffender.activate();
34 }
35} // checkForm
36
37function showAccesskeys() {
38 $$('label[accesskey]').each(function(label) {
39 showLabelAccesskey(label, label.accessKey);
40 });
41}
42
43function showLabelAccesskey(node, key) {
44 if (Object.isElement(node)) {
45 var children = node.childNodes;
46 for (var index = 0, n = children[index], l = children.length; index < l; ++index)
47 if (showLabelAccesskey(n, key))
48 return true;
49 } else if (node.nodeType == Node.TEXT_NODE) {
50 var text = node.nodeValue.toLowerCase(), key = key.toLowerCase();
51 var pos = text.indexOf(key);
52 if (-1 != pos) {
53 if (pos > 0)
54 node.parentNode.insertBefore(new Element('span').update(node.nodeValue.substring(0, pos)), node);
55 node.parentNode.insertBefore(new Element('span', { className: 'accessKey' }).update(node.nodeValue.charAt(pos)), node);
56 node.nodeValue = node.nodeValue.substring(pos + 1);
57 return true;
58 }
59 }
60 return false;
61} // showAccesskeys
62
63document.observe('dom:loaded', function() {
64 bindFormChecks();
65 $$('*[tabindex=1]').first().activate();
66 showAccesskeys();
67});