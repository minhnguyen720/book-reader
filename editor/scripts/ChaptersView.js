function downloadHTML(filename, elId, mimeType) {
    let elHtml = document.getElementById(elId).innerHTML;
    let link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

export default class ChaptersView {
    constructor(root, { onSelect, onAdd, onEdit, onDelete } = {}) {
        // the root is stand for the whole editor
        // onSelect onAdd onEdit onDelete are function that will be define in Editor.js
        // these functions provide behaviors for the editor
        this.root = root;
        this.onSelect = onSelect;
        this.onAdd = onAdd;
        this.onEdit = onEdit;
        this.onDelete = onDelete;

        // render using js
        this.root.innerHTML = `
            <div class="chapters_sidebar">
                <button class="chapters_add" type="button">Add Chapter</button>
                <div class="chapters_list">
                    <div class="chapters_list-item chapters_list-item-selected">
                        <div class="chapters_small-title"></div>
                    </div>
                </div>
            </div>
            <div class="chapters_preview">
                <div class="chapters_toolbar">
                    <button type="button" id="bold-btn" class="tool-btn">
                        <i class=' fas fa-bold'></i>
                    </button>
                    <button type="button" id="italic-btn" class="tool-btn">
                        <i class=' fas fa-italic'></i>
                    </button>
                    <button type="button" id="underline-btn" class="tool-btn">
                        <i class=' fas fa-underline'></i>
                    </button>
                    <button type="button" class="tool-btn" id="hilite-btn">
                        <i class="fas fa-highlighter"></i>
                    </button>
                    <input class="tool-btn" id="highlight" type="color">
                    <button type="button" class="tool-btn" id="align-left-btn">
                        <i class="fas fa-align-left"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-center-btn">
                        <i class="fas fa-align-center"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-justify-btn">
                        <i class="fas fa-align-justify"></i>
                    </button>
                    <button type="button" class="tool-btn" id="align-rite-btn">
                        <i class="fas fa-align-right"></i>
                    </button>
                    <button type="button" class="tool-btn" id="save-btn">
                        <i class="fas fa-save"></i>
                    </button>
                    <button type="button" class="tool-btn" id="download-btn">
                        <i class="fas fa-download"></i>
                    </button>
                    <select class="tool-btn" id="font">
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Helvetica ">Helvetica </option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                    <select class="tool-btn" id="font-size">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
                <div class="chapters_content">
                    <input type="text" class="chapters_title" placeholder="Enter a title...">
                    <div class="chapters_body" id="body-content" contenteditable="true" spellcheck="false">
                    </div>
                </div>
            </div>
        `;

        // REFERENCES
        const addChapterBtn = this.root.querySelector(".chapters_add");
        const inpTitle = this.root.querySelector(".chapters_title");
        const inpBody = this.root.querySelector("#body-content");

        const saveBtn = document.querySelector('#save-btn');
        const boldBtn = document.querySelector('#bold-btn')
        const italicBtn = document.querySelector('#italic-btn')
        const underlineBtn = document.querySelector('#underline-btn')
        const highlightColor = document.querySelector('#highlight')
        const hiliteBtn = document.querySelector('#hilite-btn')
        const fontChangeBtn = document.querySelector('#font')
        const fontSizeBtn = document.querySelector('#font-size')
        const aLeft = document.querySelector('#align-left-btn');
        const aRite = document.querySelector('#align-rite-btn');
        const aCenter = document.querySelector('#align-center-btn');
        const aJustify = document.querySelector('#align-justify-btn');

        // BUTTON FUNCTIONS
        // add chapters
        addChapterBtn.addEventListener("click", () => {
            this.onAdd();
        });

        // body and title saving function
        saveBtn.addEventListener('click', () => {
            const updatedTitle = inpTitle.value.trim();
            const updatedBody = inpBody.innerHTML

            this.onEdit(updatedTitle, updatedBody);
        })

        const downloadBtn = document.querySelector('#download-btn')
        downloadBtn.addEventListener('click', () => {
            console.log(document.getElementById("current").innerText)
            downloadHTML(document.getElementById("current").innerText+'.html', 'body-content','text/html')
        })

        // toolbar functions
        boldBtn.addEventListener('click', () => {
            document.execCommand('bold');
        })

        italicBtn.addEventListener('click', () => {
            document.execCommand('italic');
        })

        underlineBtn.addEventListener('click', () => {
            document.execCommand('underline');
        })

        let isHilite = false;
        hiliteBtn.addEventListener('click', () => {
            if (isHilite) {
                let arg = highlightColor.value;
                document.execCommand('hiliteColor', false, arg = '#ffffff');
                isHilite = false;
                arg = highlightColor.value;

            } else {
                document.execCommand('hiliteColor', false, highlightColor.value);
                isHilite = true;
            }
        })

        aLeft.addEventListener('click', () => {
            document.execCommand('justifyLeft')
        })

        aRite.addEventListener('click', () => {
            document.execCommand('justifyRight')
        })
        aCenter.addEventListener('click', () => {
            document.execCommand('justifyCenter')
        })

        aJustify.addEventListener('click', () => {
            document.execCommand('justifyFull')
        })

        fontChangeBtn.addEventListener('input', () => {
            document.execCommand('fontName', false, fontChangeBtn.value);
        })

        // change font size while typing
        document.execCommand('fontSize', false, fontSizeBtn.value);
        // change font size of the selected lines
        fontSizeBtn.addEventListener('input', () => {
            document.execCommand('fontSize', false, fontSizeBtn.value);
        })

        this.updateChapterPreviewVisibility(false);
    }

    

    // render the chapter in the sidebar
    _createListItemHTML(id, title) {
        return `
            <div class="chapters_list-item" data-chapter-id="${id}">
                <div class="chapters_small-title">${title}</div>
            </div>
        `
    }

    // update existing chapter, pass in the list of exist chapter
    updateChapterList(chapters) {
        // hold items store in the sidebar
        const chaptersListContainer = this.root.querySelector(".chapters_list");

        // empty list
        chaptersListContainer.innerHTML = "";

        // insert html for each chapter
        // take id and title of each chapter in list of exist chapter and render
        for (const chapter of chapters) {
            const html = this._createListItemHTML(chapter.id, chapter.title);

            // add html as a leaf to a DOM tree
            chaptersListContainer.insertAdjacentHTML("beforeend", html);
        }

        // add select/delete events for each list item
        // whenever a new chapter is added, this part will add function to that list-item
        chaptersListContainer.querySelectorAll(".chapters_list-item").forEach(chapterListItem => {
            chapterListItem.addEventListener("click", () => {
                // chapterId come from line 184 'data-chapter-id'
                this.onSelect(chapterListItem.dataset.chapterId);
            });

            chapterListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure to delete?");

                if (doDelete) {
                    this.onDelete(chapterListItem.dataset.chapterId);
                }
            });
        })
    }

    // called when a chapter is selected, get chapter title and body, make the selected chapter bold in the sidebar
    updateActiveChapter(chapter) {
        // update title and body
        this.root.querySelector(".chapters_title").value = chapter.title;
        this.root.querySelector("#body-content").innerHTML = chapter.body;

        // update selected chapter
        this.root.querySelectorAll(".chapters_list-item").forEach(chapterListItem => {
            chapterListItem.classList.remove("chapters_list-item-selected");
            chapterListItem.removeAttribute("id")
        });

        // the chapter we choose gonna have bold effect
        this.root.querySelector(`.chapters_list-item[data-chapter-id="${chapter.id}"]`).classList.add("chapters_list-item-selected");
        this.root.querySelector(`.chapters_list-item[data-chapter-id="${chapter.id}"]`).id = "current"
    }

    // hide section when nothing is selected, hide by default
    updateChapterPreviewVisibility(visible) {
        this.root.querySelector(".chapters_preview").style.visibility = visible ? "visible" : "hidden"
    }
}