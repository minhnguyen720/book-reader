let body = document.getElementsByTagName("body");
let txt = document.getElementsByTagName("iframe");
txt.contentDocument.designMode = "on";

let select = document.getElementsByTagName("select");
select.addEventListener("click", execCommandWithArg);
let btn = document.getElementsByTagName("button");
btn.addEventListener("click", execCmd);

function execCmd(command) {
    /** When an HTML document has been switched to designMode,
    its document object exposes an execCommand method to run commands
    that manipulate the current editable region **/
    txt.document.execCommand(command, false, null);
}

function execCommandWithArg(command, arg) {
    txt.document.execCommand(command, false, arg);
}

let isInEditMode = true;
function toggleEditMode() {
    if(isInEditMode) {
    txt.document.designMode = 'Off';
    isInEditMode = false;
} else {
        txt.document.designMode = 'On';
        isInEditMode = true;
    }
}