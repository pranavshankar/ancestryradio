var frm = frames['frame'].document;
var otherhead = frm.getElementsByTagName("head")[0];
var link = frm.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", "css/style.css");
otherhead.appendChild(link);