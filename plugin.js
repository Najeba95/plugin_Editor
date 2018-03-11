////////////////////////////////////////////////////////////////////
var flag = false;
var inspected;
var div = document.createElement("Div");
div.id = "editor";
div.className = "new";
div.style.position = "fixed";
div.style.bottom = "0px";
div.style.width = "1500px";
div.style.height = "250px";
div.style.border = "2px solid";
div.style.boxShadow = "10px 10px #888888";
div.style.backgroundColor = "#eeeef0";
div.style.opacity = "1";
div.style.zIndex = "1";
var divElement = document.createElement("Div");
divElement.id = "divID";
divElement.className = "new";
var close = document.createElement("IMG");
close.id = "close";
close.className = "new";
close.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/X-black-white-border.svg/768px-X-black-white-border.svg.png");
close.setAttribute("width", "25");
close.setAttribute("height", "25");
close.style.position = "absolute";
close.style.top = "5px";
close.style.right = "0px";
var dots_div = document.createElement("Div");
dots_div.id = "mydiv";
dots_div.style.zIndex = "9";
dots_div.style.position = "absolute";
var dots = document.createElement("IMG");
dots.id = "mydivheader";
dots.style.cursor = "move";
dots.style.zIndex = "10"
dots.className = "new";
dots.setAttribute("src", "https://cdn1.iconfinder.com/data/icons/web-and-user-interface-21/512/30-512.png");
dots.setAttribute("width", "20");
dots.setAttribute("height", "20");
dots.setAttribute("draggable", "true");
dots.style.position = "absolute";
dots.style.top = "5px";
dots.style.left = "0px";
var menue = document.createElement("UL");
menue.style.listStyleType = "none";
var delet = document.createElement("li");
var text1 = document.createTextNode("Delete");
delet.appendChild(text1);
delet.id = "delete";
delet.className = "new";
delet.style.float = "left";
delet.style.padding = "15px";
delet.style.margin = "5px";
delet.style.border = "1px solid";
delet.style.backgroundColor = "#F08ECD";
var html = document.createElement("li");
var text2 = document.createTextNode("HTML");
html.appendChild(text2);
html.id = "html";
html.className = "new";
html.style.float = "left";
html.style.padding = "15px";
html.style.margin = "5px";
html.style.border = "1px solid";
html.style.backgroundColor = "#F08ECD";
var css = document.createElement("li");
var text3 = document.createTextNode("CSS");
css.appendChild(text3);
css.id = "css";
css.className = "new";
css.style.float = "left";
css.style.padding = "15px";
css.style.margin = "5px";
css.style.border = "1px solid";
css.style.backgroundColor = "#F08ECD";
menue.appendChild(delet);
menue.appendChild(html);
menue.appendChild(css);
menue.style.position = "absolute";
menue.style.top = "2px";
menue.style.left = "590px";
divElement.appendChild(close);
dots_div.appendChild(dots);
divElement.appendChild(dots_div);
divElement.appendChild(menue);
div.appendChild(divElement);
document.body.appendChild(div);
/////////////////////////////////////////////////////////////
document.getElementById("close").onclick = function (ev) {
    document.getElementById("editor").remove();
}
//Make the DIV element draggagle:
dragElement(document.getElementById(("mydiv")));

function dragElement(elmnt) {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    document.addEventListener("dragover", function (event) {
            // prevent default to allow drop
            event.preventDefault();
        }, false
    );

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    document.addEventListener("drop", function (event) {
        if (flag) {
            document.getElementById("path").remove();
        }

        // document.getElementById("path").remove();
        event = event || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        inspected = event.target;
        var element = inspected;
        var path = document.createElement("div");
        path.id = "path";
        path.style.position = "absolute";
        path.style.bottom = "15px";
        path.style.left = "5px";
        var elem = document.createElement("span");
        var text = document.createTextNode(element.nodeName.toString());
        elem.appendChild(text);
        elem.style.padding = "10px";
        elem.style.margin = "5px";
        elem.style.backgroundColor = "#888888";
        elem.onmouseover = function (ev) {
            elem.style.backgroundColor = "#F08ECD";
            inspected.style.backgroundColor = "#F08ECD";

        }
        elem.onmouseout = function (ev) {
            ev.target.style.backgroundColor = "#888888";
            inspected.style.backgroundColor = "#FFFFFF";

        }

        path.appendChild(elem);
        var parents = [];
        var elem_parents = [];
        var i = 0;
        while (element.parentElement != null) {
            parents[i] = document.createElement("span");
            var text = document.createTextNode(element.parentElement.nodeName.toString());
            parents[i].appendChild(text);
            parents[i].style.padding = "10px";
            parents[i].style.margin = "5px";
            parents[i].value = element.parentElement;

            parents[i].style.backgroundColor = "#888888";
            elem_parents[i] = element.parentElement;
            parents[i].onmouseover = function (ev) {
                ev.target.style.backgroundColor = "#F08ECD";
                ev.target.value.style.backgroundColor = "#F08ECD";
            }
            parents[i].onmouseout = function (ev) {
                ev.target.style.backgroundColor = "#888888";
                ev.target.value.style.backgroundColor = "#FFF";

            }
            path.appendChild(parents[i]);
            element = element.parentElement;
            i++;
        }
        div.appendChild(path);
        flag = true;
    });
}

/////////////////////////////////////////////////////////////
document.getElementById("delete").onclick = function (ev) {
    inspected.remove();
    document.getElementById("editor").remove();
}
/////////////////////////////////////////////////////////////
document.getElementById("html").onclick = function (ev) {
    menue.remove();
    var html_menue = document.createElement("UL");
    html_menue.style.listStyleType = "none";
    var div = document.createElement("li");
    var textFordiv = document.createTextNode("<div>");
    div.appendChild(textFordiv);
    div.id = "new_div";
    div.className = "new";
    div.style.float = "left";
    div.style.padding = "15px";
    div.style.margin = "5px";
    div.style.border = "1px solid";
    div.style.backgroundColor = "#F08ECD";
    var para = document.createElement("li");
    var textForP = document.createTextNode("<p>");
    para.appendChild(textForP);
    para.id = "new_P";
    para.className = "new";
    para.style.float = "left";
    para.style.padding = "15px";
    para.style.margin = "5px";
    para.style.border = "1px solid";
    para.style.backgroundColor = "#F08ECD";
    var header = document.createElement("li");
    var textForh = document.createTextNode("<h1>");
    header.appendChild(textForh);
    header.id = "new_h";
    header.className = "new";
    header.style.float = "left";
    header.style.padding = "15px";
    header.style.margin = "5px";
    header.style.border = "1px solid";
    header.style.backgroundColor = "#F08ECD";
    var header2 = document.createElement("li");
    var textForh2 = document.createTextNode("<h2>");
    header2.appendChild(textForh2);
    header2.id = "new_h2";
    header2.className = "new";
    header2.style.float = "left";
    header2.style.padding = "15px";
    header2.style.margin = "5px";
    header2.style.border = "1px solid";
    header2.style.backgroundColor = "#F08ECD";
    var header3 = document.createElement("li");
    var textForh3 = document.createTextNode("<h3>");
    header3.appendChild(textForh3);
    header3.id = "new_h3";
    header3.className = "new";
    header3.style.float = "left";
    header3.style.padding = "15px";
    header3.style.margin = "5px";
    header3.style.border = "1px solid";
    header3.style.backgroundColor = "#F08ECD";

    var span = document.createElement("li");
    var textForSpan = document.createTextNode("<span>");
    span.appendChild(textForSpan);
    span.id = "new_span";
    span.className = "new";
    span.style.float = "left";
    span.style.padding = "15px";
    span.style.margin = "5px";
    span.style.border = "1px solid";
    span.style.backgroundColor = "#F08ECD";
    var input = document.createElement("li");
    var textForinput = document.createTextNode("<input>");
    input.appendChild(textForinput);
    input.id = "new_input";
    input.className = "new";
    input.style.float = "left";
    input.style.padding = "15px";
    input.style.margin = "5px";
    input.style.border = "1px solid";
    input.style.backgroundColor = "#F08ECD";
    var button = document.createElement("li");
    var textForbtn = document.createTextNode("<button>");
    button.appendChild(textForbtn);
    button.id = "new_button";
    button.className = "new";
    button.style.float = "left";
    button.style.padding = "15px";
    button.style.margin = "5px";
    button.style.border = "1px solid";
    button.style.backgroundColor = "#F08ECD";
    var new_text = document.createElement("li");
    var text = document.createTextNode("change text");
    new_text.appendChild(text);
    new_text.id = "new_text";
    new_text.className = "new";
    new_text.style.float = "left";
    new_text.style.padding = "15px";
    new_text.style.margin = "5px";
    new_text.style.border = "1px solid";
    new_text.style.backgroundColor = "#F08ECD";
    html_menue.appendChild(header);
    html_menue.appendChild(header2);
    html_menue.appendChild(header3);
    html_menue.appendChild(div);
    html_menue.appendChild(span);
    html_menue.appendChild(para);
    html_menue.appendChild(input);
    html_menue.appendChild(button);
    html_menue.appendChild(new_text);
    html_menue.style.position = "absolute";
    html_menue.style.top = "15px";
    html_menue.style.left = "10px";
    divElement.appendChild(html_menue);
    document.getElementById("new_div").onclick = function (ev) {
        var new_div = document.createElement("Div");
        var textForDiv = document.createTextNode("new div");
        new_div.appendChild(textForDiv);
        inspected.appendChild(new_div);
        document.getElementById("editor").remove();
    }
    document.getElementById("new_P").onclick = function (ev) {
        var p = document.createElement("P");
        var textForP = document.createTextNode("new paragraph");
        p.appendChild(textForP);
        inspected.appendChild(p);
        document.getElementById("editor").remove();
    }
    document.getElementById("new_h").onclick = function (ev) {
        var h1 = document.createElement("h1");
        var textForH1 = document.createTextNode("new Header 1");
        h1.appendChild(textForH1);
        inspected.appendChild(h1);
        document.getElementById("editor").remove();
    }
    document.getElementById("new_h2").onclick = function (ev) {
        var h2 = document.createElement("h2");
        var textForH2 = document.createTextNode("new Header 2");
        h2.appendChild(textForH2);
        inspected.appendChild(h2);
        document.getElementById("editor").remove();
    }
    document.getElementById("new_h3").onclick = function (ev) {
        var h3 = document.createElement("h3");
        var textForH3 = document.createTextNode("new Header 3");
        h3.appendChild(textForH3);
        inspected.appendChild(h3);
        document.getElementById("editor").remove();
    }
    document.getElementById("new_span").onclick = function (ev) {
        var span = document.createElement("span");
        var textForspan = document.createTextNode("new span");
        span.appendChild(textForspan);
        inspected.appendChild(span);
        document.getElementById("editor").remove();
    }
    document.getElementById("new_input").onclick = function (ev) {
        var new_text = document.createElement("INPUT");
        new_text.setAttribute("type", "text");
        inspected.appendChild(new_text);
        document.getElementById("editor").remove();
    }
    document.getElementById("new_button").onclick = function (ev) {
        var button = document.createElement("BUTTON");
        var textForbtn = document.createTextNode("new button");
        button.appendChild(textForbtn);
        inspected.appendChild(button);
        document.getElementById("editor").remove();
    }
    document.getElementById("new_text").onclick = function (ev) {
        var text = document.createElement("INPUT");
        text.setAttribute("type", "text");
        text.id = "myText";
        text.className = "new";
        var button = document.createElement("BUTTON");
        button.id = "change";
        button.className = "new";
        var textForbtn = document.createTextNode("change text");
        button.appendChild(textForbtn);
        inspected.appendChild(text);
        inspected.appendChild(button);
        document.getElementById("change").onclick = function (ev) {
            var value = document.getElementById("myText").value;
            inspected.innerHTML = value;
            document.getElementById("editor").remove();
        }
        document.getElementById("editor").remove();
    }
}
/////////////////////////////////////////////////////////////
document.getElementById("css").onclick = function (ev) {
    menue.remove();
    var css_menue = document.createElement("UL");
    css_menue.style.listStyleType = "none";
    var color = document.createElement("li");
    var textForCoclor = document.createTextNode("backgroundColor");
    color.appendChild(textForCoclor);
    color.id = "color";
    color.className = "new";
    color.style.float = "left";
    color.style.padding = "15px";
    color.style.margin = "5px";
    color.style.border = "1px solid";
    color.style.backgroundColor = "#F08ECD";
    var font_color = document.createElement("li");
    var textForFontColor = document.createTextNode("font_Color");
    font_color.appendChild(textForFontColor);
    font_color.id = "font_color";
    font_color.className = "new";
    font_color.style.float = "left";
    font_color.style.padding = "15px";
    font_color.style.margin = "5px";
    font_color.style.border = "1px solid";
    font_color.style.backgroundColor = "#F08ECD";
    var border = document.createElement("li");
    var textForBorder = document.createTextNode("border");
    border.appendChild(textForBorder);
    border.id = "border";
    border.className = "new";
    border.style.float = "left";
    border.style.padding = "15px";
    border.style.margin = "5px";
    border.style.border = "1px solid";
    border.style.backgroundColor = "#F08ECD";
    var border_color = document.createElement("li");
    var textForBorderColor = document.createTextNode("border_color");
    border_color.appendChild(textForBorderColor);
    border_color.id = "border_color";
    border_color.className = "new";
    border_color.style.float = "left";
    border_color.style.padding = "15px";
    border_color.style.margin = "5px";
    border_color.style.border = "1px solid";
    border_color.style.backgroundColor = "#F08ECD";
    var font = document.createElement("li");
    var textForFont = document.createTextNode("font_type");
    font.appendChild(textForFont);
    font.id = "font";
    font.className = "new";
    font.style.float = "left";
    font.style.padding = "15px";
    font.style.margin = "5px";
    font.style.border = "1px solid";
    font.style.backgroundColor = "#F08ECD";
    var margin = document.createElement("li");
    var textForMargin = document.createTextNode("margin");
    margin.appendChild(textForMargin);
    margin.id = "margin";
    margin.className = "new";
    margin.style.float = "left";
    margin.style.padding = "15px";
    margin.style.margin = "5px";
    margin.style.border = "1px solid";
    margin.style.backgroundColor = "#F08ECD";
    var padding = document.createElement("li");
    var textForpadding = document.createTextNode("padding");
    padding.appendChild(textForpadding);
    padding.id = "padding";
    padding.className = "new";
    padding.style.float = "left";
    padding.style.padding = "15px";
    padding.style.margin = "5px";
    padding.style.border = "1px solid";
    padding.style.backgroundColor = "#F08ECD";
    var move_element = document.createElement("li");
    var textForMove = document.createTextNode("Move Element");
    move_element.appendChild(textForMove);
    move_element.id = "move_element";
    move_element.className = "new";
    move_element.style.float = "left";
    move_element.style.padding = "15px";
    move_element.style.margin = "5px";
    move_element.style.border = "1px solid";
    move_element.style.backgroundColor = "#F08ECD";
    css_menue.appendChild(color);
    css_menue.appendChild(border);
    css_menue.appendChild(border_color);
    css_menue.appendChild(font);
    css_menue.appendChild(font_color);
    css_menue.appendChild(margin);
    css_menue.appendChild(padding);
    css_menue.appendChild(move_element);
    css_menue.style.position = "absolute";
    css_menue.style.top = "15px";
    css_menue.style.left = "10px";
    divElement.appendChild(css_menue);
    document.getElementById("color").onclick = function (ev) {
        var color_input = document.createElement("INPUT");
        color_input.setAttribute("type", "color");
        color_input.id = "color_ID";
        inspected.appendChild(color_input);
        document.getElementById("color_ID").focus();
        document.getElementById("color_ID").style.visibility = "hidden";
        document.getElementById("color_ID").click();
        document.getElementById("editor").remove();
        document.getElementById("color_ID").onchange = function (ev2) {
            var value = color_input.value;
            inspected.style.backgroundColor = value;
            document.getElementById("editor").remove();
        }
    }
    document.getElementById("font_color").onclick = function (ev) {
        var color_input = document.createElement("INPUT");
        color_input.setAttribute("type", "color");
        color_input.id = "color_ID";
        inspected.appendChild(color_input);
        document.getElementById("color_ID").focus();
        document.getElementById("color_ID").style.visibility = "hidden";
        document.getElementById("color_ID").click();
        document.getElementById("editor").remove();
        document.getElementById("color_ID").onchange = function (ev2) {
            var value = color_input.value;
            inspected.style.color = value;
            document.getElementById("editor").remove();
        }
    }
    document.getElementById("border").onclick = function (ev) {
        inspected.style.border = "thick solid";
        document.getElementById("editor").remove();
    }
    document.getElementById("border_color").onclick = function (ev) {
        var color_input = document.createElement("INPUT");
        color_input.setAttribute("type", "color");
        color_input.id = "color_ID";
        inspected.appendChild(color_input);
        document.getElementById("color_ID").focus();
        document.getElementById("color_ID").style.visibility = "hidden";
        document.getElementById("color_ID").click();
        document.getElementById("editor").remove();
        document.getElementById("color_ID").onchange = function (ev2) {
            var value = color_input.value;
            inspected.style.borderColor = value;
            document.getElementById("editor").remove();
        }
    }
    document.getElementById("font").onclick = function (ev) {
        inspected.style.fontFamily = "Impact,Charcoal,sans-serif";
        document.getElementById("editor").remove();
    }
    document.getElementById("margin").onclick = function (ev) {
        inspected.style.marginTop = "30px";
        document.getElementById("editor").remove();
    }
    document.getElementById("padding").onclick = function (ev) {
        inspected.style.padding = "20px";
        document.getElementById("editor").remove();
    }
    document.getElementById("move_element").onclick = function (ev) {
        inspected.setAttribute("draggable", "true");
        inspected.style.cursor = "move";
        //Make the DIV element draggagle:
        moveElement(inspected);

        function moveElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            inspected.onmousedown = dragMouseDown;
            function dragMouseDown(e) {
                e = e || window.event;
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
            }
            document.addEventListener("dragover", function (event) {
                    // prevent default to allow drop
                    event.preventDefault();
                }, false
            );
            document.addEventListener("drop", function (event) {
             //alert("hi");
                var x = event.clientX;
                var y = event.clientY;
            });
        }

        document.getElementById("editor").remove();
    }
}

