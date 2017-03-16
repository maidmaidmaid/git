///
function event::onChannelText(prefix, channel, text)
{
if (text.match(/^g([0-9]*)>/i)) {
var num = parseInt(RegExp.$1);
if (isNaN(num) || num < 1) num = 1;
if (num > 10) num = 10;

var q = RegExp.rightContext;
q = q.replace(/^s+/g, '');

if (text.length > 0) {
var req = new ActiveXObject("Microsoft.XMLHTTP");
if (req) {
req.onreadystatechange = function() {
if (req.readyState == 4) {
var s = req.responseText;
for (var i=0; i<num; i++) {
if (!s.match(/]*class=l[^>]*>(.+?)/)) break;
s = RegExp.rightContext;
var url = RegExp.$1;
var title = RegExp.$2;
title = title.replace(/</?b>/g, '');
send(channel, url + " " + title);
}
}
}
var url = 'http://www.google.co.jp/search?num=' + num + '&q=' + encodeURIComponent(q);
req.open('get', url, true);
req.send('');
}
}
}
}
///
