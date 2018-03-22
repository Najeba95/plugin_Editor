////////////////////////////////////////////////////////////////////
var parents = [];
var inspected;
var editor = document.createElement("Div");
editor.id = "editor";
editor.className = "editor";
var top_bar = document.createElement("Div");
top_bar.id = "top_bar";
top_bar.className = "top_bar";
var close = document.createElement("IMG");
close.id = "close";
close.className = "top_items";
close.style.right = "5px";
close.setAttribute("src", "https://cdn2.iconfinder.com/data/icons/flaticons-stroke/16/x-3-256.png");
var chose = document.createElement("IMG");
chose.id = "chose";
chose.className = "top_items";
chose.style.cursor = "move";
chose.setAttribute("src", "https://png.icons8.com/ios/1600/nui2.png");
chose.setAttribute("draggable", "true");
chose.style.left = "0px";
var del = document.createElement("IMG");
del.id = "delete";
del.className = "top_items";
del.setAttribute("src", "https://image.flaticon.com/icons/svg/61/61848.svg");
del.style.left = "70px";
var html = document.createElement("IMG");
html.id = "html";
html.className = "top_items";
html.setAttribute("src", "https://freeiconshop.com/wp-content/uploads/edd/html-outline.png");
html.style.left = "140px";
var css = document.createElement("IMG");
css.id = "css";
css.className = "top_items";
css.setAttribute("src", "https://freeiconshop.com/wp-content/uploads/edd/css-outline.png");
css.style.left = "210px";
var bootStrap = document.createElement("IMG");
bootStrap.id = "bootStrap";
bootStrap.className = "top_items";
bootStrap.setAttribute("src", "http://www.montano.se/PICTURE/4398-79-b.jpg");
bootStrap.style.left = "280px";
top_bar.appendChild(chose);
top_bar.appendChild(close);
top_bar.appendChild(del);
top_bar.appendChild(html);
top_bar.appendChild(css);
top_bar.appendChild(bootStrap);
editor.appendChild(top_bar);
document.body.appendChild(editor);
/////////////////////////////////////////////////////////////
document.getElementById("close").onclick = function (ev) {
    document.getElementById("editor").remove();
}
//Make the DIV element draggagle:
dragElement(document.getElementById(("chose")));
/////////////////////////////////////////////////////////////
function dragElement(elmnt) {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("chose")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById("chose").onmousedown = dragMouseDown;
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
        document.onmouseup = null;
        document.onmousemove = null;
    }

    document.addEventListener("drop", function (event) {
        if (document.getElementById("path") != null) {
            document.getElementById("path").remove();
        }
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
        console.log(inspected.className);
        console.log(inspected.id);
        var element = inspected;
        var path = document.createElement("div");
        path.id = "path";
        path.style.position = "absolute";
        var elem = document.createElement("span");
        elem.id = "element";
        var text = document.createTextNode(element.nodeName.toString());
        elem.appendChild(text);
        elem.style.border = "1px solid";
        elem.style.fontSize = "12px";
        elem.style.marginLeft = "2px";
        elem.onmouseover = function (ev) {
            elem.style.backgroundColor = "#89C1FF";
            inspected.style.backgroundColor = "#89C1FF";
        }
        elem.onmouseout = function (ev) {
            elem.style.backgroundColor = "#FFF";
            inspected.style.backgroundColor = "#FFFFFF";
        }
        var i = 0;
        while (element.parentElement != null) {
            parents[i] = document.createElement("span");
            var text = document.createTextNode(element.parentElement.nodeName.toString());
            parents[i].appendChild(text);
            parents[i].value = element.parentElement;
            parents[i].id = i;
            parents[i].style.border = "1px solid";
            parents[i].style.fontSize = "12px";
            parents[i].style.marginLeft = "2px";
            parents[i].onmouseover = function (ev) {
                ev.target.style.backgroundColor = "#89C1FF";
                ev.target.value.style.backgroundColor = "#89C1FF";
            }
            parents[i].onmouseout = function (ev) {
                ev.target.style.backgroundColor = "#FFF";
                ev.target.value.style.backgroundColor = "#FFF";
            }
            element = element.parentElement;
            i++;
        }
        for (var j = (parents.length) - 1; j >= 0; j--) {
            var arrow = document.createElement("span");
            var arrow_text = document.createTextNode(">");
            arrow.appendChild(arrow_text);
            arrow.style.marginLeft = "2px";
            arrow.style.fontSize = "12px";
            path.appendChild(parents[j]);
            path.appendChild(arrow);
        }
        path.appendChild(elem);
        var bottom_bar = document.createElement("Div");
        bottom_bar.id = "bottom_bar";
        bottom_bar.className = "bottom_bar";
        bottom_bar.appendChild(path);
        editor.appendChild(bottom_bar);
    });
}
/////////////////////////////////////////////////////////////
document.getElementById("delete").onclick = function (ev) {
    inspected.remove();
}
/////////////////////////////////////////////////////////////
document.getElementById("html").onclick = function (ev) {
    if (document.getElementById("css_bar") != null) {
        document.getElementById("css_bar").remove()
    }
    if (document.getElementById("bootStrap_bar")!= null) {
        document.getElementById("bootStrap_bar").remove()
    }
    var reset = document.createElement("INPUT");
    reset.setAttribute("type", "reset");
    reset.id = "reset";
    reset.className = "reset";
    reset.style.backgroundImage = "url('https://d30y9cdsu7xlg0.cloudfront.net/png/415758-200.png')";
    reset.value = "";
    var div = document.createElement("span");
    var textFordiv = document.createTextNode("<div>");
    div.appendChild(textFordiv);
    div.id = "new_div";
    div.style.marginLeft = "8px";
    div.className = "html_elements";
    var para = document.createElement("span");
    var textForP = document.createTextNode("<p>");
    para.appendChild(textForP);
    para.id = "new_p";
    para.className = "html_elements";
    var header = document.createElement("select");
    header.id = "h_types";
    header.className = "html_elements";
    var h = document.createElement("option");
    h.value = "h";
    h.text = "<h>";
    h.style.fontSize = "12px";
    header.appendChild(h);
    var h1 = document.createElement("option");
    h1.value = "h1";
    h1.text = "h1";
    h1.style.fontSize = "12px";
    header.appendChild(h1);
    var h2 = document.createElement("option");
    h2.value = "h2";
    h2.text = "h2";
    h2.style.fontSize = "12px";
    header.appendChild(h2);
    var h3 = document.createElement("option");
    h3.value = "h3";
    h3.text = "h3";
    h3.style.fontSize = "12px";
    header.appendChild(h3);
    var h4 = document.createElement("option");
    h4.value = "h4";
    h4.text = "h4";
    h4.style.fontSize = "12px";
    header.appendChild(h4);
    var h5 = document.createElement("option");
    h5.value = "h5";
    h5.text = "h5";
    h5.style.fontSize = "12px";
    header.appendChild(h5);
    var span = document.createElement("span");
    var textForSpan = document.createTextNode("<span>");
    span.appendChild(textForSpan);
    span.id = "new_span";
    span.className = "html_elements";
    var label = document.createElement("span");
    var textForLabel = document.createTextNode("<label>");
    label.appendChild(textForLabel);
    label.id = "new_label";
    label.className = "html_elements";
    var inp = document.createElement("select");
    inp.id = "input_types";
    inp.className = "html_elements";
    var input = document.createElement("option");
    input.value = "input";
    input.text = "input";
    input.style.fontSize = "12px";
    inp.appendChild(input);
    var color = document.createElement("option");
    color.value = "color";
    color.text = "color";
    color.style.fontSize = "12px";
    inp.appendChild(color);
    var date = document.createElement("option");
    date.value = "date";
    date.text = "date";
    date.style.fontSize = "10px";
    inp.appendChild(date);
    var email = document.createElement("option");
    email.value = "email";
    email.text = "email";
    email.style.fontSize = "12px";
    inp.appendChild(email);
    var number = document.createElement("option");
    number.value = "number";
    number.text = "num";
    number.style.fontSize = "12px";
    inp.appendChild(number);
    var pass = document.createElement("option");
    pass.value = "password";
    pass.text = "pass";
    pass.style.fontSize = "12px";
    inp.appendChild(pass);
    var check = document.createElement("option");
    check.value = "checkbox";
    check.text = "check";
    check.style.fontSize = "12px";
    inp.appendChild(check);
    var radio = document.createElement("option");
    radio.value = "radio";
    radio.text = "radio";
    radio.style.fontSize = "12px";
    inp.appendChild(radio);
    var button = document.createElement("span");
    var textForbtn = document.createTextNode("<button>");
    button.appendChild(textForbtn);
    button.id = "new_button";
    button.className = "html_elements";
    button.style.marginLeft = "8px";
    var ol = document.createElement("span");
    var textForol = document.createTextNode("<ol>");
    ol.appendChild(textForol);
    ol.id = "new_ol";
    ol.className = "html_elements";
    var ul = document.createElement("span");
    var textForul = document.createTextNode("<ul>");
    ul.appendChild(textForul);
    ul.id = "new_ul";
    ul.className = "html_elements";
    var li = document.createElement("span");
    var textForli = document.createTextNode("<li>");
    li.appendChild(textForli);
    li.id = "new_li";
    li.className = "html_elements";
    var new_text = document.createElement("span");
    var text = document.createTextNode("Text");
    new_text.appendChild(text);
    new_text.id = "new_text";
    new_text.className = "html_elements";
    var html_bar = document.createElement("Div");
    html_bar.id = "html_bar";
    html_bar.className = "html_bar";
    html_bar.appendChild(reset);
    html_bar.appendChild(header);
    html_bar.appendChild(div);
    html_bar.appendChild(span);
    html_bar.appendChild(para);
    html_bar.appendChild(ul);
    html_bar.appendChild(ol);
    html_bar.appendChild(li);
    html_bar.appendChild(label);
    html_bar.appendChild(inp);
    html_bar.appendChild(button);
    html_bar.appendChild(new_text);
    editor.appendChild(html_bar);
    document.getElementById("reset").onclick = function (ev2) {
        location.reload();
    }
    document.getElementById("new_div").onclick = function (ev2) {
        var new_div = document.createElement("Div");
        var textForDiv = document.createTextNode("new div");
        new_div.appendChild(textForDiv);
        inspected.appendChild(new_div);
    }
    document.getElementById("new_p").onclick = function (ev2) {
        var p = document.createElement("P");
        var textForP = document.createTextNode("new paragraph");
        p.appendChild(textForP);
        inspected.appendChild(p);
    }
    document.getElementById("new_span").onclick = function (ev2) {
        var span = document.createElement("span");
        var textForspan = document.createTextNode("new span");
        span.appendChild(textForspan);
        inspected.appendChild(span);
    }
    document.getElementById("new_label").onclick = function (ev2) {
        var lable = document.createElement("LABEL");
        var textForLabel = document.createTextNode("new label");
        lable.appendChild(textForLabel);
        inspected.appendChild(lable);
    }
    document.getElementById("new_button").onclick = function (ev2) {
        var button = document.createElement("BUTTON");
        var textForbtn = document.createTextNode("new button");
        button.appendChild(textForbtn);
        inspected.appendChild(button);
    }
    document.getElementById("new_ol").onclick = function (ev2) {
        var ol = document.createElement("OL");
        var item = document.createElement("LI");
        var text = document.createTextNode("first item");
        item.appendChild(text);
        ol.appendChild(item);
        inspected.appendChild(ol);
    }
    document.getElementById("new_ul").onclick = function (ev2) {
        var ul = document.createElement("UL");
        var item = document.createElement("LI");
        var text = document.createTextNode("first item");
        item.appendChild(text);
        ul.appendChild(item);
        inspected.appendChild(ul);
    }
    document.getElementById("new_li").onclick = function (ev2) {
        var element = inspected;
        var tag = element.tagName;
        if (tag == "UL") {
            var item = document.createElement("LI");
            var text = document.createTextNode("new item");
            item.appendChild(text);
            parent.appendChild(item);
        }
        if (tag == "OL") {
            var item = document.createElement("LI");
            var text = document.createTextNode("new item");
            item.appendChild(text);
            parent.appendChild(item);
        }
    }
    document.getElementById("new_text").onclick = function (ev2) {
        

    }
    document.getElementById("h_types").onchange = function (ev2) {
        var e = document.getElementById("h_types");
        var selected = e.options[e.selectedIndex].value;
        var h = document.createElement(selected.toString());
        var textForH = document.createTextNode("new Header");
        h.appendChild(textForH);
        inspected.appendChild(h);
    }
    document.getElementById("input_types").onchange = function (ev2) {
        var e = document.getElementById("input_types");
        var selected = e.options[e.selectedIndex].value;
        var input = document.createElement("INPUT");
        input.setAttribute("type", selected);
        inspected.appendChild(input);
    }
}
/////////////////////////////////////////////////////////////
document.getElementById("css").onclick = function (ev) {
    if (document.getElementById("html_bar") != null) {
        document.getElementById("html_bar").remove()
    }
    if (document.getElementById("bootStrap_bar")!= null) {
        document.getElementById("bootStrap_bar").remove()
    }
    var reset = document.createElement("INPUT");
    reset.setAttribute("type", "reset");
    reset.id = "reset";
    reset.className = "reset";
    reset.style.marginTop = "35px";
    reset.value = "";
    reset.style.backgroundImage = "url('https://d30y9cdsu7xlg0.cloudfront.net/png/415758-200.png')";
    var color = document.createElement("span");
    color.id = "color";
    color.className = "css_property";
    color.style.backgroundImage = "url('http://www.free-icons-download.net/images/background-color-icon-4552.png')";
    var border = document.createElement("span");
    border.id = "border";
    border.className = "css_property";
    border.style.backgroundImage = "url('http://cdn.onlinewebfonts.com/svg/img_521976.png')";
    var border_right = document.createElement("span");
    border_right.id = "border_right";
    border_right.className = "css_property";
    border_right.style.backgroundImage = "url('https://cdn2.iconfinder.com/data/icons/alignment-and-paragraph-5/52/table__border__right__layout__outline-512.png')";
    var border_left = document.createElement("span");
    border_left.id = "border_left";
    border_left.className = "css_property";
    border_left.style.backgroundImage = "url('https://cdn2.iconfinder.com/data/icons/alignment-and-paragraph-5/52/left__border__outline__table__layout-512.png')";
    var border_top = document.createElement("span");
    border_top.id = "border_top";
    border_top.className = "css_property";
    border_top.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/alignment-paragraph-3/24/top_border_line_table_style_format-512.png')";
    var border_bottom = document.createElement("span");
    border_bottom.id = "border_bottom";
    border_bottom.className = "css_property";
    border_bottom.style.backgroundImage = "url('https://cdn1.iconfinder.com/data/icons/material-design-icons-light/24/border-bottom-512.png')";
    var border_type = document.createElement("select");
    border_type.id = "border_type";
    border_type.className = "css_property";
    border_type.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/editor-volume-2/24/border-style-512.png')";
    var first = document.createElement("option");
    first.value = "solid";
    first.text = "solid";
    first.style.fontSize = "12px";
    border_type.appendChild(first);
    var second = document.createElement("option");
    second.value = "double";
    second.text = "double";
    second.style.fontSize = "12px";
    border_type.appendChild(second);
    var third = document.createElement("option");
    third.value = "dashed";
    third.text = "dashed";
    third.style.fontSize = "12px";
    border_type.appendChild(third);
    var border_size = document.createElement("select");
    border_size.id = "border_size";
    border_size.className = "css_property";
    var first = document.createElement("option");
    first.value = "1px";
    first.text = "1";
    first.style.fontSize = "12px";
    border_size.appendChild(first);
    var second = document.createElement("option");
    second.value = "2px";
    second.text = "2";
    second.style.fontSize = "12px";
    border_size.appendChild(second);
    var third = document.createElement("option");
    third.value = "3px";
    third.text = "3";
    third.style.fontSize = "12px";
    border_size.appendChild(third);
    var fourth = document.createElement("option");
    fourth.value = "4px";
    fourth.text = "4";
    fourth.style.fontSize = "12px";
    border_size.appendChild(fourth);
    border_size.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/penthemes-layour-builder/512/button-512.png')";
    var border_color = document.createElement("span");
    border_color.id = "border_color";
    border_color.className = "css_property";
    border_color.style.backgroundImage = "url('http://icons.iconarchive.com/icons/icons8/ios7/512/Editing-Border-Color-icon.png')";
    var font_type = document.createElement("select");
    font_type.id = "font_Type";
    font_type.className = "css_property";
    font_type.style.backgroundImage = "url('http://icons.iconarchive.com/icons/mart/glaze/128/font-truetype-icon.png')";
    var first = document.createElement("option");
    first.value = "serif";
    first.text = "serif";
    first.style.fontSize = "12px";
    font_type.appendChild(first);
    var second = document.createElement("option");
    second.value = "sans-serif";
    second.text = "sans-serif";
    second.style.fontSize = "12px";
    font_type.appendChild(second);
    var third = document.createElement("option");
    third.value = "monospace";
    third.text = "monospace";
    third.style.fontSize = "12px";
    font_type.appendChild(third);
    var fourth = document.createElement("option");
    fourth.value = "cursive";
    fourth.text = "cursive";
    fourth.style.fontSize = "12px";
    font_type.appendChild(fourth);
    var fifth = document.createElement("option");
    fifth.value = "fantasy";
    fifth.text = "fantasy";
    fifth.style.fontSize = "12px";
    font_type.appendChild(fifth);
    var sixth = document.createElement("option");
    sixth.value = "system-ui";
    sixth.text = "system-ui";
    sixth.style.fontSize = "12px";
    font_type.appendChild(sixth);
    var font_size = document.createElement("select");
    font_size.id = "font_size";
    font_size.className = "css_property";
    var first = document.createElement("option");
    first.value = "8px";
    first.text = "8";
    first.style.fontSize = "12px";
    font_size.appendChild(first);
    var second = document.createElement("option");
    second.value = "10px";
    second.text = "10";
    second.style.fontSize = "12px";
    font_size.appendChild(second);
    var third = document.createElement("option");
    third.value = "12px";
    third.text = "12";
    third.style.fontSize = "10px";
    font_size.appendChild(third);
    var fourth = document.createElement("option");
    fourth.value = "14px";
    fourth.text = "14";
    fourth.style.fontSize = "12px";
    font_size.appendChild(fourth);
    var fifth = document.createElement("option");
    fifth.value = "16px";
    fifth.text = "16";
    fifth.style.fontSize = "12px";
    font_size.appendChild(fifth);
    var sixth = document.createElement("option");
    sixth.value = "18px";
    sixth.text = "18";
    sixth.style.fontSize = "12px";
    font_size.appendChild(sixth);
    var seventh = document.createElement("option");
    seventh.value = "20px";
    seventh.text = "20";
    seventh.style.fontSize = "12px";
    font_size.appendChild(seventh);
    var ninth = document.createElement("option");
    ninth.value = "26px";
    ninth.text = "26";
    ninth.style.fontSize = "12px";
    font_size.appendChild(ninth);
    var tenth = document.createElement("option");
    tenth.value = "28px";
    tenth.text = "28";
    tenth.style.fontSize = "12px";
    font_size.appendChild(tenth);
    var ele = document.createElement("option");
    ele.value = "30px";
    ele.text = "30";
    ele.style.fontSize = "12px";
    font_size.appendChild(ele);
    var twel = document.createElement("option");
    twel.value = "32px";
    twel.text = "32";
    twel.style.fontSize = "12px";
    font_size.appendChild(twel);
    font_size.style.backgroundImage = "url('https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/edit-font-size-512.png')";
    var font_color = document.createElement("span");
    font_color.id = "font_color";
    font_color.className = "css_property";
    font_color.className = "css_property";
    font_color.style.backgroundImage = "url('http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-format-text-color-icon.png')";
    var align_left = document.createElement("span");
    align_left.id = "align_left";
    align_left.className = "css_property";
    align_left.style.backgroundImage = "url('https://png.icons8.com/small/1600/align-left.png')";
    var align_center = document.createElement("span");
    align_center.id = "align_center";
    align_center.className = "css_property";
    align_center.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/tab-bar-ios-and-wp8-vector-icons/48/align_center-512.png')";
    var align_right = document.createElement("span");
    align_right.id = "align_right";
    align_right.className = "css_property";
    align_right.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/tab-bar-ios-and-wp8-vector-icons/48/align_right-512.png')";
    var width = document.createElement("select");
    width.id = "width";
    width.className = "css_property";
    width.style.backgroundImage = "url('https://png.icons8.com/windows/1600/width.png')";
    var first = document.createElement("option");
    first.value = "300px";
    first.text = "300";
    first.style.fontSize = "12px";
    width.appendChild(first);
    var second = document.createElement("option");
    second.value = "600px";
    second.text = "600";
    second.style.fontSize = "12px";
    width.appendChild(second);
    var third = document.createElement("option");
    third.value = "900px";
    third.text = "900";
    third.style.fontSize = "12px";
    width.appendChild(third);
    var fourth = document.createElement("option");
    fourth.value = "1200px";
    fourth.text = "1200";
    fourth.style.fontSize = "12px";
    width.appendChild(fourth);
    var height = document.createElement("select");
    height.id = "height";
    height.className = "css_property";
    height.style.backgroundImage = "url('https://png.icons8.com/windows/1600/height.png')";
    var first = document.createElement("option");
    first.value = "20px";
    first.text = "20";
    first.style.fontSize = "12px";
    height.appendChild(first);
    var second = document.createElement("option");
    second.value = "40px";
    second.text = "40";
    second.style.fontSize = "12px";
    height.appendChild(second);
    var third = document.createElement("option");
    third.value = "60px";
    third.text = "60";
    third.style.fontSize = "12px";
    height.appendChild(third);
    var fourth = document.createElement("option");
    fourth.value = "80px";
    fourth.text = "80";
    fourth.style.fontSize = "12px";
    height.appendChild(fourth);
    var margin = document.createElement("span");
    margin.id = "margin";
    margin.className = "css_property";
    margin.style.backgroundImage = "url('https://cdn.iconscout.com/public/images/icon/premium/png-512/text-align-margin-left-tool-33aa95b8444a7bac-512x512.png')";
    var padding = document.createElement("span");
    padding.id = "padding";
    padding.className = "css_property";
    padding.style.backgroundImage = "url('https://cdn.iconscout.com/public/images/icon/premium/png-512/padding-spaces-text-alignment-format-33d3d66ff1eed229-512x512.png')";
    var position = document.createElement("span");
    position.id = "position";
    position.className = "css_property";
    position.style.backgroundImage = "url('https://cdn1.iconfinder.com/data/icons/business-cursor/512/move_2-512.png')";
    var css_bar = document.createElement("Div");
    css_bar.id = "css_bar";
    css_bar.className = "css_bar";
    css_bar.className = "css";
    css_bar.appendChild(reset);
    css_bar.appendChild(color);
    css_bar.appendChild(border);
    css_bar.appendChild(border_right);
    css_bar.appendChild(border_left);
    css_bar.appendChild(border_top);
    css_bar.appendChild(border_bottom);
    css_bar.appendChild(border_type);
    css_bar.appendChild(border_size);
    css_bar.appendChild(border_color);
    css_bar.appendChild(font_type);
    css_bar.appendChild(font_size);
    css_bar.appendChild(font_color);
    css_bar.appendChild(align_left);
    css_bar.appendChild(align_center);
    css_bar.appendChild(align_right);
    css_bar.appendChild(margin);
    css_bar.appendChild(padding);
    css_bar.appendChild(width);
    css_bar.appendChild(height);
    css_bar.appendChild(position);
    editor.appendChild(css_bar);
    document.getElementById("reset").onclick = function (ev2) {
        location.reload();
    }
    document.getElementById("color").onclick = function (ev2) {
        var color_input = document.createElement("INPUT");
        color_input.setAttribute("type", "color");
        color_input.id = "color_ID";
        inspected.appendChild(color_input);
        document.getElementById("color_ID").focus();
        document.getElementById("color_ID").style.visibility = "hidden";
        document.getElementById("color_ID").click();
        // document.getElementById("editor").remove();
        document.getElementById("color_ID").onchange = function (ev2) {
            var value = color_input.value;
            inspected.style.backgroundColor = value;
            document.getElementById("color_ID").remove();
        }
    }
    document.getElementById("border_color").onclick = function (ev2) {
        var color_input = document.createElement("INPUT");
        color_input.setAttribute("type", "color");
        color_input.id = "color_ID";
        inspected.appendChild(color_input);
        document.getElementById("color_ID").focus();
        document.getElementById("color_ID").style.visibility = "hidden";
        document.getElementById("color_ID").click();
        // document.getElementById("editor").remove();
        document.getElementById("color_ID").onchange = function (ev2) {
            var value = color_input.value;
            inspected.style.borderColor = value;
            document.getElementById("color_ID").remove();
        }
    }
    document.getElementById("font_color").onclick = function (ev2) {
        var color_input = document.createElement("INPUT");
        color_input.setAttribute("type", "color");
        color_input.id = "color_ID";
        inspected.appendChild(color_input);
        document.getElementById("color_ID").focus();
        document.getElementById("color_ID").style.visibility = "hidden";
        document.getElementById("color_ID").click();
        // document.getElementById("editor").remove();
        document.getElementById("color_ID").onchange = function (ev2) {
            var value = color_input.value;
            inspected.style.color = value;
            document.getElementById("color_ID").remove();
        }
    }
    document.getElementById("border").onclick = function (ev2) {
        inspected.style.border = "1px solid";
    }
    document.getElementById("border_right").onclick = function (ev2) {
        inspected.style.borderRight = "1px solid";
    }
    document.getElementById("border_left").onclick = function (ev2) {
        inspected.style.borderLeft = "1px solid";
    }
    document.getElementById("border_top").onclick = function (ev2) {
        inspected.style.borderTop = "1px solid";
    }
    document.getElementById("border_bottom").onclick = function (ev2) {
        inspected.style.borderBottom = "1px solid";
    }
    document.getElementById("align_left").onclick = function (ev2) {
        inspected.style.textAlign = "left";
    }
    document.getElementById("align_center").onclick = function (ev2) {
        inspected.style.textAlign = "center";
    }
    document.getElementById("align_right").onclick = function (ev2) {
        inspected.style.textAlign = "right";
    }
    document.getElementById("margin").onclick = function (ev2) {
        inspected.style.margin = "5px";
    }
    document.getElementById("padding").onclick = function (ev2) {
        inspected.style.padding = "5px";
    }
    document.getElementById("font_size").onchange = function (ev2) {
        var e = document.getElementById("font_size");
        var selected = e.options[e.selectedIndex].value;
        inspected.style.fontSize = selected;
    }
    document.getElementById("border_size").onchange = function (ev2) {
        var e = document.getElementById("border_size");
        var selected = e.options[e.selectedIndex].value;
        inspected.style.borderWidth = selected;
    }
    document.getElementById("width").onchange = function (ev2) {
        var e = document.getElementById("width");
        var selected = e.options[e.selectedIndex].value;
        inspected.style.width = selected;
    }
    document.getElementById("height").onchange = function (ev2) {
        var e = document.getElementById("height");
        var selected = e.options[e.selectedIndex].value;
        inspected.style.height = selected;
    }
    document.getElementById("font_Type").onchange = function (ev2) {
        var e = document.getElementById("font_Type");
        var selected = e.options[e.selectedIndex].value;
        inspected.style.fontFamily = selected;
    }
    document.getElementById("border_type").onchange = function (ev2) {
        var e = document.getElementById("border_type");
        var selected = e.options[e.selectedIndex].value;
        inspected.style.borderStyle = selected;
    }
    document.getElementById("position").onclick = moveElement;

    function moveElement() {
        inspected.style.position = "absolute";
        inspected.setAttribute("draggable", "true");
        inspected.style.cursor = "move";
        moveElement(inspected);

        function moveElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(elmnt.id)) {
                /* if present, the header is where you move the DIV from:*/
                document.getElementById(elmnt.id).onmousedown = dragMouseDown;
            } else {
                /* otherwise, move the DIV from anywhere inside the DIV:*/
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
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

            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }
}
document.getElementById("bootStrap").onclick = function (ev) {
    if (document.getElementById("css_bar") != null) {
        document.getElementById("css_bar").remove()
    }
    if (document.getElementById("html_bar") != null) {
        document.getElementById("html_bar").remove()
    }
    var reset = document.createElement("INPUT");
    reset.setAttribute("type", "reset");
    reset.id = "reset";
    reset.className = "reset";
    reset.style.backgroundImage = "url('https://d30y9cdsu7xlg0.cloudfront.net/png/415758-200.png')";
    reset.value = "";
    reset.style.backgroundSize = "contain";
    var container = document.createElement("span");
    var textContainer = document.createTextNode(".container");
    container.appendChild(textContainer);
    container.id = ".container";
    container.style.marginLeft = "8px";
    container.className = "bootstrap";
    var well = document.createElement("span");
    var textWell = document.createTextNode(".well");
    well.appendChild(textWell);
    well.id = ".well";
    well.className = "bootstrap";
    var row = document.createElement("span");
    var rowText = document.createTextNode(".row");
    row.appendChild(rowText);
    row.id = ".row";
    row.className = "bootstrap";
    var column = document.createElement("select");
    column.id = ".column";
    column.style.marginLeft = "2px";
    column.className = "bootstrap";
    var col = document.createElement("option");
    col.value = "column";
    col.text = "col-sm";
    col.style.fontSize = "12px";
    column.appendChild(col);
    var col_2 = document.createElement("option");
    col_2.value = "col-sm-2";
    col_2.text = "col-sm-2";
    col_2.style.fontSize = "12px";
    column.appendChild(col_2);
    var col_3 = document.createElement("option");
    col_3.value = "col-sm-3";
    col_3.text = "col-sm-3";
    col_3.style.fontSize = "12px";
    column.appendChild(col_3);
    var col_4 = document.createElement("option");
    col_4.value = "col-sm-4";
    col_4.text = "col-sm-4";
    col_4.style.fontSize = "12px";
    column.appendChild(col_4);
    var col_5 = document.createElement("option");
    col_5.value = "col-sm-5";
    col_5.text = "col-sm-5";
    col_5.style.fontSize = "12px";
    column.appendChild(col_5);
    var col_6 = document.createElement("option");
    col_6.value = "col-sm-6";
    col_6.text = "col-sm-6";
    col_6.style.fontSize = "12px";
    column.appendChild(col_6);
    var col_7 = document.createElement("option");
    col_7.value = "col-sm-7";
    col_7.text = "col-sm-7";
    col_7.style.fontSize = "12px";
    column.appendChild(col_7);
    var col_8 = document.createElement("option");
    col_8.value = "col-sm-8";
    col_8.text = "col-sm-8";
    col_8.style.fontSize = "12px";
    column.appendChild(col_8);
    var col_9 = document.createElement("option");
    col_9.value = "col-sm-9";
    col_9.text = "col-sm-9";
    col_9.style.fontSize = "12px";
    var col_10 = document.createElement("option");
    col_10.value = "col-sm-10";
    col_10.text = "col-sm-10";
    col_10.style.fontSize = "12px";
    column.appendChild(col_10);
    var col_11 = document.createElement("option");
    col_11.value = "col-sm-11";
    col_11.text = "col-sm-11";
    col_11.style.fontSize = "12px";
    column.appendChild(col_11);
    var col_12 = document.createElement("option");
    col_12.value = "col-sm-12";
    col_12.text = "col-sm-12";
    col_12.style.fontSize = "12px";
    column.appendChild(col_12);
    var col_md = document.createElement("select");
    col_md.id = "col_md";
    col_md.style.marginLeft = "2px";
    col_md.className = "bootstrap";
    var col_1 = document.createElement("option");
    col_1.value = "col-md";
    col_1.text = "col-md";
    col_1.style.fontSize = "12px";
    col_md.appendChild(col_1);
    var col_2 = document.createElement("option");
    col_2.value = "col-md-2";
    col_2.text = "col-md-2";
    col_2.style.fontSize = "12px";
    col_md.appendChild(col_2);
    var col_3 = document.createElement("option");
    col_3.value = "col-md-3";
    col_3.text = "col-md-3";
    col_3.style.fontSize = "12px";
    col_md.appendChild(col_3);
    var col_4 = document.createElement("option");
    col_4.value = "col-md-4";
    col_4.text = "col-md-4";
    col_4.style.fontSize = "12px";
    col_md.appendChild(col_4);
    var col_5 = document.createElement("option");
    col_5.value = "col-md-5";
    col_5.text = "col-md-5";
    col_5.style.fontSize = "12px";
    col_md.appendChild(col_5);
    var col_6 = document.createElement("option");
    col_6.value = "col-md-6";
    col_6.text = "col-md-6";
    col_6.style.fontSize = "12px";
    col_md.appendChild(col_6);
    var col_7 = document.createElement("option");
    col_7.value = "col-md-7";
    col_7.text = "col-md-7";
    col_7.style.fontSize = "12px";
    col_md.appendChild(col_7);
    var col_8 = document.createElement("option");
    col_8.value = "col-md-8";
    col_8.text = "col-md-8";
    col_8.style.fontSize = "12px";
    col_md.appendChild(col_8);
    var col_9 = document.createElement("option");
    col_9.value = "col-md-9";
    col_9.text = "col-md-9";
    col_9.style.fontSize = "12px";
    col_md.appendChild(col_9);
    var col_10 = document.createElement("option");
    col_10.value = "col-md-10";
    col_10.text = "col-md-10";
    col_10.style.fontSize = "12px";
    col_md.appendChild(col_10);
    var col_11 = document.createElement("option");
    col_11.value = "col-md-11";
    col_11.text = "col-md-11";
    col_11.style.fontSize = "12px";
    col_md.appendChild(col_11);
    var col_12 = document.createElement("option");
    col_12.value = "col-md-12";
    col_12.text = "col-md-12";
    col_12.style.fontSize = "12px";
    col_md.appendChild(col_12);
    var col_lg = document.createElement("select");
    col_lg.id = "col_lg";
    col_lg.style.marginLeft = "2px";
    col_lg.className = "bootstrap";
    var col = document.createElement("option");
    col.value = "col-lg";
    col.text = "col-lg";
    col.style.fontSize = "12px";
    col_lg.appendChild(col);
    var col_2 = document.createElement("option");
    col_2.value = "col-lg-2";
    col_2.text = "col-lg-2";
    col_2.style.fontSize = "12px";
    col_lg.appendChild(col_2);
    var col_3 = document.createElement("option");
    col_3.value = "col-lg-3";
    col_3.text = "col-lg-3";
    col_3.style.fontSize = "12px";
    col_lg.appendChild(col_3);
    var col_4 = document.createElement("option");
    col_4.value = "col-lg-4";
    col_4.text = "col-lg-4";
    col_4.style.fontSize = "12px";
    col_lg.appendChild(col_4);
    var col_5 = document.createElement("option");
    col_5.value = "col-lg-5";
    col_5.text = "col-lg-5";
    col_5.style.fontSize = "12px";
    col_lg.appendChild(col_5);
    var col_6 = document.createElement("option");
    col_6.value = "col-lg-6";
    col_6.text = "col-lg-6";
    col_6.style.fontSize = "12px";
    col_lg.appendChild(col_6);
    var col_7 = document.createElement("option");
    col_7.value = "col-lg-7";
    col_7.text = "col-lg-7";
    col_7.style.fontSize = "12px";
    col_lg.appendChild(col_7);
    var col_8 = document.createElement("option");
    col_8.value = "col-lg-8";
    col_8.text = "col-lg-8";
    col_8.style.fontSize = "12px";
    col_lg.appendChild(col_8);
    var col_9 = document.createElement("option");
    col_9.value = "col-lg-9";
    col_9.text = "col-lg-9";
    col_9.style.fontSize = "12px";
    col_lg.appendChild(col_9);
    var col_10 = document.createElement("option");
    col_10.value = "col-lg-10";
    col_10.text = "col-lg-10";
    col_10.style.fontSize = "12px";
    col_lg.appendChild(col_10);
    var col_11 = document.createElement("option");
    col_11.value = "col-lg-11";
    col_11.text = "col-lg-11";
    col_11.style.fontSize = "12px";
    col_lg.appendChild(col_11);
    var col_12 = document.createElement("option");
    col_12.value = "col-lg-12";
    col_12.text = "col-lg-12";
    col_12.style.fontSize = "12px";
    col_lg.appendChild(col_12);
    var headers = document.createElement("select");
    headers.id = "headers";
    headers.className = "bootstrap";
    var header = document.createElement("option");
    header.value = "header";
    header.text = "header";
    header.style.fontSize = "10px";
    headers.appendChild(header);
    var h1 = document.createElement("option");
    h1.value = "h1";
    h1.text = "h1";
    h1.style.fontSize = "12px";
    headers.appendChild(h1);
    var h2 = document.createElement("option");
    h2.value = "h2";
    h2.text = "h2";
    h2.style.fontSize = "12px";
    headers.appendChild(h2);
    var h3 = document.createElement("option");
    h3.value = "h3";
    h3.text = "h3";
    h3.style.fontSize = "12px";
    headers.appendChild(h3);
    var span = document.createElement("span");
    var spanText = document.createTextNode("span");
    span.appendChild(spanText);
    span.id = "span";
    span.className = "bootstrap";
    var p = document.createElement("span");
    var pText = document.createTextNode("p");
    p.appendChild(pText);
    p.id = "p";
    p.className = "bootstrap";
    var ul = document.createElement("span");
    var ulText = document.createTextNode("ul");
    ul.appendChild(ulText);
    ul.id = "ul";
    ul.className = "bootstrap";
    var ol = document.createElement("span");
    var olText = document.createTextNode("ol");
    ol.appendChild(olText);
    ol.id = "ol";
    ol.className = "bootstrap";
    var li = document.createElement("span");
    var liText = document.createTextNode("li");
    li.appendChild(liText);
    li.id = "li";
    li.className = "bootstrap";
    var bootStrap_bar = document.createElement("Div");
    bootStrap_bar.className = "bootStrap_bar";
    bootStrap_bar.id = "bootStrap_bar";
    bootStrap_bar.appendChild(reset);
    bootStrap_bar.appendChild(container);
    bootStrap_bar.appendChild(well);
    bootStrap_bar.appendChild(row);
    bootStrap_bar.appendChild(column);
    bootStrap_bar.appendChild(col_md);
    bootStrap_bar.appendChild(col_lg);
    bootStrap_bar.appendChild(headers);
    bootStrap_bar.appendChild(span);
    bootStrap_bar.appendChild(p);
    bootStrap_bar.appendChild(ol);
    bootStrap_bar.appendChild(ul);
    bootStrap_bar.appendChild(li);
    editor.appendChild(bootStrap_bar);
    document.getElementById("reset").onclick = function (ev2) {
        location.reload();
    }
    document.getElementById(".container").onclick = function (ev2) {
        var container = document.createElement("Div");
        container.style.height = "35px";
        container.className = "container-fluid ";
        container.style.border = "1px solid";
        inspected.appendChild(container);
    }
    document.getElementById("p").onclick = function (ev2) {
        var p = document.createElement("p");
        p.style.height = "25px";
        var text = document.createTextNode("new paragraph");
        p.appendChild(text);
        inspected.appendChild(p);
    }
    document.getElementById("span").onclick = function (ev2) {
        var span = document.createElement("span");
        span.style.height = "25px";
        var text = document.createTextNode("new span");
        span.appendChild(text);
        //spanclassName = "span";
        inspected.appendChild(span);
    }
    document.getElementById("ol").onclick = function (ev2) {
        var ol = document.createElement("ol");
        ol.style.height = "25px";
        ol.className = "ol";
        var text = document.createTextNode("ordered list");
        ol.appendChild(text);
        inspected.appendChild(ol);
    }
    document.getElementById("ul").onclick = function (ev2) {
        var ul = document.createElement("ul");
        ul.style.height = "25px";
        ul.className = "ul";
        var text = document.createTextNode("unordered list");
        ul.appendChild(text);
        inspected.appendChild(ul);
    }
    document.getElementById("li").onclick = function (ev2) {
        var li = document.createElement("li");
        li.style.height = "25px";
        li.className = "li";
        var text = document.createTextNode("new list item");
        li.appendChild(text);
        inspected.appendChild(li);
    }
    document.getElementById(".well").onclick = function (ev2) {
        var well = document.createElement("Div");
        well.style.height = "25px";
        well.className = "well";
        var text = document.createTextNode("well");
        well.appendChild(text);
        inspected.appendChild(well);
    }
    document.getElementById(".row").onclick = function (ev2) {
        var row = document.createElement("Div");
        row.style.height = "25px";
        row.className = "row";
        var text = document.createTextNode("row");
        row.appendChild(text);
        inspected.appendChild(row);
    }
    document.getElementById(".column").onchange = function (ev2) {
        var x = inspected.id;
        if(x!="col-sm-element"&&x!="col-md-element"&&x!="col-lg-element") {
            var e = document.getElementById(".column");
            var selected = e.options[e.selectedIndex].value;
            var column = document.createElement("Div");
            column.style.height = "25px";
            column.style.backgroundColor = "#aac5fe";
            column.style.border = "2px solid";
            column.classList.add(selected);
            column.classList.add("fff");
            column.id = "col-sm-element";
            inspected.appendChild(column);
            for (var x =0 ;x< inspected.classList.length;x++){
               console.log(inspected.classList[x]) ;
            }
        }
        else {
            var e = document.getElementById(".column");
            var selected = e.options[e.selectedIndex].value;
            for (var x =0 ;x< inspected.classList.length;x++){
                if(inspected.classList[x].includes("col-sm")){
                    inspected.classList.remove( inspected.classList[x]);
                }
            }
            inspected.classList.add(selected);
        }
    }
    document.getElementById("col_lg").onchange = function (ev2) {
        var x = inspected.id;
        if(x!="col-lg-element"&&x!="col-md-element"&&x!="col-sm-element") {
            var e = document.getElementById("col_lg");
            var selected = e.options[e.selectedIndex].value;
            var column = document.createElement("Div");
            column.style.height = "25px";
            column.style.backgroundColor = "#aac5fe";
            column.style.border = "2px solid";
            column.classList.add(selected);
            column.classList.add("fff");
            column.id = "col-lg-element";
            inspected.appendChild(column);
            for (var x =0 ;x< inspected.classList.length;x++){
                console.log(inspected.classList[x]) ;
            }
        }
        else {
            var e = document.getElementById("col_lg");
            var selected = e.options[e.selectedIndex].value;
            for (var x =0 ;x< inspected.classList.length;x++){
                if(inspected.classList[x].includes("col-lg")){
                    inspected.classList.remove( inspected.classList[x]);
                }
            }
            inspected.classList.add(selected);
        }
    }
    document.getElementById("col_md").onchange = function (ev2) {
        var x = inspected.id;
        if(x!="col-md-element"&&x!="col-lg-element"&&x!="col-sm-element") {
            var e = document.getElementById("col_md");
            var selected = e.options[e.selectedIndex].value;
            var column = document.createElement("Div");
            column.style.height = "25px";
            column.style.backgroundColor = "#aac5fe";
            column.style.border = "2px solid";
            column.classList.add(selected);
            column.classList.add("fff");
            column.id = "col-md-element";
            inspected.appendChild(column);
            for (var x =0 ;x< inspected.classList.length;x++){
                console.log(inspected.classList[x]) ;
            }
        }
        else {
            var e = document.getElementById("col_md");
            var selected = e.options[e.selectedIndex].value;
            for (var x =0 ;x< inspected.classList.length;x++){
                if(inspected.classList[x].includes("col-md")){
                    inspected.classList.remove( inspected.classList[x]);
                }
            }
            inspected.classList.add(selected);
        }
    }

}
document.addEventListener("click", function(ev){
    var clicked = ev.target;
    var id = clicked.id;
    if(id=="0"||id=="1"||id=="2"|| id=="3"||id=="4"|| id=="5") {
        inspected = parents[id].value;
        inspected.style.border = "2px solid";
    }
    if(id = "element") {
        inspected = inspected;
        //inspected.style.border = "2px solid";
    }
});
