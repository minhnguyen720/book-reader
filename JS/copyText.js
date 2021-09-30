function copyText() {
    let selObj = window.getSelection();
    let selText = selObj.toString()
    if (selText.length > 0) {
        navigator.clipboard.writeText(selText);
        alert("Copied: " + selText);
        
    } else alert("Please select somthing")
}
