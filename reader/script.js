function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

function changeFontSize(inputScale) {
    let fontTag = document.querySelectorAll("font, span");
    for (let i = 0; i < fontTag.length; i++) {
        let fontSize = fontTag[i].getAttribute('size')
        if (fontSize == 0){
            fontSize = 3
        }
        fontTag[i].setAttribute('size', fontSize*inputScale)
    }
}

function changeFontType(inputType) {
    let fontTag = document.querySelectorAll("font");
    for (let i = 0; i < fontTag.length; i++) {
        let fontType = fontTag[i].getAttribute('face')
        if (fontType == null) {
            let att = document.createAttribute('face')
            att.value = "something"
            fontTag[i].setAttributeNode(att);
        }
        fontTag[i].setAttribute('face', inputType)
    }
}