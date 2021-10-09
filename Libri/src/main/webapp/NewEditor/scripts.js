var savedRange = null;

document.addEventListener("selectionchange", HandleSelectionChange, false);
document.addEventListener("change", removeEmptySpan)
// Constantly update selection to avoid error by using trap event

function removeEmptySpan() {
    let spanArray = document.querySelectorAll('span')
    for (let i = 0; i < spanArray.length; i++){
        console.log(spanArray[i].textContent)
        if (spanArray[i].textContent == "" || spanArray[i].textContent == null) {
            console.log(i)
            spanArray[i].remove();
            console.log("deleted span")
        }
    }
}

function HandleSelectionChange() {
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount > 0) {
        savedRange = sel.getRangeAt(0);
    }
}

function italic() {
    // Checking rangeCount before calling getRangeAt
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount == 0 && savedRange != null) {
        sel.addRange(savedRange);
    }
    if (sel && sel.rangeCount > 0) {
        // Get location and text info
        var range = sel.getRangeAt(0);
        let selText = sel.toString();
        // Add style and text info into node
        var italic = document.createElement('i');
        italic.textContent = selText;
        // Replace the selected content with the newly added node
        range.deleteContents();
        range.insertNode(italic);
    }
}
function bold() {
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount == 0 && savedRange != null) {
        sel.addRange(savedRange);
    }
    if (sel && sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        let selText = sel.toString();
        var bold = document.createElement('b');
        bold.textContent = selText;
        range.deleteContents();
        range.insertNode(bold);
    }
}
function underline() {
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount == 0 && savedRange != null) {
        sel.addRange(savedRange);
    }
    if (sel && sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        let selText = sel.toString();
        var underline = document.createElement('u');
        underline.textContent = selText;
        range.deleteContents();
        range.insertNode(underline);
    }
}
function fontSize(fontSize) {
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount == 0 && savedRange != null) {
        sel.addRange(savedRange);
    }
    if (sel && sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        let selText = sel.toString();

        var size = document.createElement('span');
        size.textContent = selText;
        size.style.fontSize = fontSize+'rem';
        
        range.deleteContents();
        range.insertNode(size);
    }
}
function fontType(fontType) {
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount == 0 && savedRange != null) {
        sel.addRange(savedRange);
    }
    if (sel && sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        let selText = sel.toString();

        var type = document.createElement('span');
        type.textContent = selText;
        type.style.fontFamily = fontType;
        

        range.deleteContents();
        range.insertNode(type);
    }
}
function fontColor() {
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount == 0 && savedRange != null) {
        sel.addRange(savedRange);
    }
    if (sel && sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        let selText = sel.toString();

        var color = document.createElement('span');
        color.textContent = selText;
        color.style.color = 'red';
        

        range.deleteContents();
        range.insertNode(color);
    }
}
let fontTypeButton = document.querySelector("#button-font");
let fontSizeButton = document.querySelector("#button-size");

document.getElementById("button-italic").addEventListener("click", italic);
document.getElementById("button-bold").addEventListener("click", bold);
document.getElementById("button-underline").addEventListener("click", underline);
document.getElementById("button-size").addEventListener("input", function(){console.log(fontSizeButton.value)});
document.getElementById("button-size").addEventListener("input", function(){fontSize(fontSizeButton.value)});
document.getElementById("button-font").addEventListener("input", function(){console.log(fontTypeButton.value)});
document.getElementById("button-font").addEventListener("input", function(){fontType(fontTypeButton.value)});
document.getElementById("button-color").addEventListener("click", fontColor);

