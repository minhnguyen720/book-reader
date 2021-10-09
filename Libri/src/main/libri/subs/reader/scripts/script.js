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
}

let fontSizePx = 16;
function changeFontSize(inputScale) {
    /**
     * if inputScale < 1: scale down, otherwise, it is scale up
     */
    if (inputScale < 1)
        fontSizePx -= 3;
    else
        fontSizePx += 3;
    let fontTag = document.querySelectorAll("font, span, p");
    // if a plain text pass in, add tag p to the paragraph
    console.log(fontTag.length)
    if (fontTag.length == 0) {
        let p = document.createElement('P');
        let output = document.getElementById('output');
        p.innerHTML = output.innerHTML;
        output.style.fontSize = fontSizePx + "px";

    } else {
        for (let i = 0; i < fontTag.length; i++) {
            let fontSize = fontTag[i].getAttribute('size')
            if (fontSize != null) {
                if (fontSize == 0) {
                    fontSize = 3
                }
                fontTag[i].setAttribute('size', fontSize * inputScale)
            }
            else { // this part is for <p> tag, idea is add 'style' attribute and then modify its properties
                /**
                 * if there is no attribute style in the tag, create one
                 * else: increase the fontSizePx value in the style attribute
                 */
                if (fontTag[i].getAttribute('style') == null) {
                    let att = document.createAttribute('style')
                    att.value = "font-size: " + fontSizePx + "px";
                    fontTag[i].setAttributeNode(att);
                } else {
                    fontTag[i].style.fontSize = fontSizePx + "px";
                }
            }
        }
    }
}

function changeFontType(inputType) {
    // get font tag
    let fontTag = document.querySelectorAll("font,p");
    /** in each fontTag get attribute face
     * if exist: set attribute face = inputType
     * if is not exist: create attribute face and set temp value for it
     * and then set face = inputType
     */
    if (fontTag.length == 0) {
        let p = document.createElement('P');
        let output = document.getElementById('output');
        p.innerHTML = output.innerHTML;
        output.style.fontFamily = inputType;
    }
    for (let i = 0; i < fontTag.length; i++) {
        fontTag[i].style.fontFamily = inputType;
    }
}
