function getUpdatedLinkList() {
	return document.querySelectorAll(".footnote-link");
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
                <button class="chapters_add" type="button">
                    <i class="fas fa-plus"></i>
                </button>
            <div class="chapters_list">
                <div class="chapters_list-item chapters_list-item-selected">
                    <div class="chapters_small-title"></div>
                </div>
            </div>
         </div>
            <div class="chapters_preview">
                <div class="chapters_toolbar">
                    <button type="button" id="preview-btn" class="btn btn-outline-secondary tool-btn">
						<i class="tool-btn__img fas fa-play"></i>
                    </button>
                    <button type="button" class="btn btn-outline-secondary tool-btn" id="save-btn" disabled>
                        <i class="tool-btn__img fas fa-save"></i>
                    </button>
					<button type="button" class="btn btn-outline-secondary tool-btn" id="paragraph-btn">
                        <i class="tool-btn__img fas fa-comment-dots"></i>
                    </button>
                    <button type="button" id="bold-btn" class="btn btn-outline-secondary  tool-btn">
                        <i class='tool-btn__img fas fa-bold'></i>
                    </button>
                    <button type="button" id="italic-btn" class="btn btn-outline-secondary  tool-btn">
                        <i class='tool-btn__img fas fa-italic'></i>
                    </button>
                    <button type="button" id="underline-btn" class="btn btn-outline-secondary  tool-btn">
                        <i class='tool-btn__img fas fa-underline'></i>
                    </button>
					<button type="button" class="btn btn-outline-secondary tool-btn" id="hilite-btn">
						<i class="tool-btn__img fas fa-palette"></i>
					</button>
					<input class="tool-btn" id="highlight" type="color">
                    <button type="button" class="btn btn-outline-secondary tool-btn" id="align-left-btn">
                        <i class="tool-btn__img fas fa-align-left"></i>
                    </button>
                    <button type="button" class="btn btn-outline-secondary tool-btn" id="align-center-btn">
                        <i class="tool-btn__img fas fa-align-center"></i>
                    </button>
                    <button type="button" class="btn btn-outline-secondary tool-btn" id="align-justify-btn">
                        <i class="tool-btn__img fas fa-align-justify"></i>
                    </button>
                    <button type="button" class="btn btn-outline-secondary tool-btn" id="align-rite-btn">
                        <i class="tool-btn__img fas fa-align-right"></i>
                    </button>
					<button type="button" class="btn btn-outline-secondary tool-btn" id="footnote-btn">
						<i class="tool-btn__img fas fa-sticky-note"></i>
					</button>
                    <select id="font">
                        <option class="options__value" value="Arial">Arial</option>
                        <option class="options__value" value="Verdana">Verdana</option>
                        <option class="options__value" value="Helvetica ">Helvetica </option>
                        <option class="options__value" value="Tahoma">Tahoma</option>
                        <option class="options__value" value="Trebuchet MS">Trebuchet MS</option>
                        <option class="options__value" value="Times New Roman">Times New Roman</option>
                    </select>
                    <button type="button" class="btn btn-outline-secondary tool-btn" id="up-btn">
                        <i class="tool-btn__img fas fa-angle-up"></i>
                    </button>
                    <button type="button" class="btn btn-outline-secondary tool-btn" id="down-btn">
                        <i class="tool-btn__img fas fa-angle-down"></i>
                    </button>
                    
                </div>
                <div class="chapters_content">
                    <input type="text" class="chapters_title" placeholder="Enter a title...">
                    <div class="main_content">					
						<div class="chapters_body" id="right_pane"></div>    
						<textarea class="chapters_body" id="body-content"></textarea>             	
					</div>
                </div>
            </div>
        `;

		// REFERENCES
		const addChapterBtn = this.root.querySelector(".chapters_add");


		const saveBtn = document.querySelector('#save-btn');
		const paraBtn = document.querySelector('#paragraph-btn');
		const boldBtn = document.querySelector('#bold-btn')
		const italicBtn = document.querySelector('#italic-btn')
		const underlineBtn = document.querySelector('#underline-btn')
		const highlightColor = document.querySelector('#highlight')
		const hiliteBtn = document.querySelector('#hilite-btn')
		const fontChangeBtn = document.querySelector('#font')
		const upbtn = document.querySelector('#up-btn');
		const downbtn = document.querySelector('#down-btn');

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
		const inpTitle = this.root.querySelector(".chapters_title");
		const inpBody = this.root.querySelector("#body-content");
		saveBtn.addEventListener('click', () => {
			let updatedTitle = inpTitle.value.trim();
			let updatedBody = inpBody.value;
			updatedBody = updatedBody.replace(/\n\r?/g, '<br />');

			this.onEdit(updatedTitle, updatedBody);

			// reset disable state for save btn
			// These lines will prevent the bug that data dont store in DB when user have not clicked the preview btn 
			let disableNode = document.createAttribute('disabled');
			document.querySelector('#save-btn').setAttributeNode(disableNode);
		})

		// toolbar functions

		paraBtn.addEventListener('click', () => {
			this.insertTag('<p class="paragraph">');
		})

		boldBtn.addEventListener('click', () => {
			this.insertTag('strong');
		})

		italicBtn.addEventListener('click', () => {
			this.insertTag('i');
		})

		underlineBtn.addEventListener('click', () => {
			this.insertTag('u');
		})

		let isColor = false;
		hiliteBtn.addEventListener('click', () => {
			if (isColor) {
				let arg = highlightColor.value;
				this.insertTag('<span style= "color:' + 'black' + ';">');
				isColor = false;
				arg = highlightColor.value;

			} else {
				this.insertTag('<span style= "color:' + highlightColor.value + ';">');
				isColor = true;
			}
		})

		aLeft.addEventListener('click', () => {
			this.insertTag('<p style="text-align:left;">');
		})

		aRite.addEventListener('click', () => {
			this.insertTag('<p style="text-align:right;">');
		})
		aCenter.addEventListener('click', () => {
			this.insertTag('<p style="text-align:center;">');
		})

		aJustify.addEventListener('click', () => {
			this.insertTag('<p style="text-align:justify;">');
		})

		fontChangeBtn.addEventListener('input', () => {
			var e = document.getElementById("font").value;
			this.insertTag('<span style= "font-family:' + e + ';">');
		})
		upbtn.addEventListener('click', () => {
			this.insertTag('size-up');
		})
		downbtn.addEventListener('click', () => {
			this.insertTag('size-down');
		})
		this.updateChapterPreviewVisibility(false);

		// -------------------------------- FOOTNOTE FUNCTION ------------------------
		let previewBtn = document.querySelector("#preview-btn");
		previewBtn.addEventListener('click', () => {
			this.preview();
		});
		
		class Footnote extends HTMLElement {
			constructor() {
				super();
			}
		}

		customElements.define('foot-note', Footnote);
		let fn = new Footnote();
		fn.className = "footnote";
		let id = Math.floor(Math.random() * 1000);
		fn.id = id;

		let footnoteBtn = document.querySelector('#footnote-btn');

        	footnoteBtn.addEventListener('click', () => {
		    let sel = document.getSelection().toString().trim();
		    if (sel) {
			this.insertTag(`footnote id=${id}`);
			id = Math.floor(Math.random() * 1000);
		    } else {
			alert(`ERROR: please select a sentence for the footnote  `)
		    }
        	})
		// ---------------------------------------------------------------------------

	} // end of constructor

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
			const html = this._createListItemHTML(chapter.chapterID, chapter.chapterName);

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
		})
	}

	// called when a chapter is selected, get chapter title and body, make the selected chapter bold in the sidebar
	updateActiveChapter(chapter) {
		// update title and body
		this.root.querySelector(".chapters_title").value = chapter.chapterName;
		this.root.querySelector("#body-content").innerHTML = chapter.chapterContent;

		let render_div = document.getElementById("right_pane");
		render_div.style.display = "none";

		// update selected chapter
		this.root.querySelectorAll(".chapters_list-item").forEach(chapterListItem => {
			chapterListItem.classList.remove("chapters_list-item-selected");
			chapterListItem.removeAttribute("id")
		});

		// the chapter we choose gonna have bold effect
		this.root.querySelector(`.chapters_list-item[data-chapter-id="${chapter.chapterID}"]`).classList.add("chapters_list-item-selected");
		this.root.querySelector(`.chapters_list-item[data-chapter-id="${chapter.chapterID}"]`).id = "current"
	}

	// hide section when nothing is selected, hide by default
	updateChapterPreviewVisibility(visible) {
		this.root.querySelector(".chapters_preview").style.visibility = visible ? "visible" : "hidden"
	}

	insertTag(tag_name) {
		let editor_textarea = document.getElementById("body-content");
		let selection = null;
		if (editor_textarea.selectionStart == editor_textarea.selectionEnd)
			selection = editor_textarea.selectionStart;
		else
			selection = editor_textarea.value.slice(editor_textarea.selectionStart, editor_textarea.selectionEnd);
		if (tag_name.substring(0, 2) === "<p")
			editor_textarea.setRangeText(`${tag_name}${selection}</p>`);
		else if (tag_name.substring(0, 5) === "<span")
			editor_textarea.setRangeText(`${tag_name}${selection}</span>`);
		else if (tag_name.substring(0, 8) == "footnote") {
			editor_textarea.setRangeText(`${selection}<${tag_name}></footnote>`);
			}
		else if (tag_name != null)
			editor_textarea.setRangeText(`<${tag_name}>${selection}</${tag_name}>`);
	}


	preview() {
		/**
		- WHY WE HAVE THIS LINE: since save function take data in right_pane element so the saveBtn should only be able to use
		when the preview btn is pressed
		- FIX THE BUG: data wont save to the DB when
		user press save btn but have not press preview btn
		 */
		document.querySelector('#save-btn').removeAttribute('disabled');

		// render function
		let text_to_render = document.getElementById("body-content").value;
		let render_div = document.getElementById("right_pane");
		//add <br> tag by replacing \n
		text_to_render = text_to_render.replace(/\n\r?/g, '<br />');
		/**
		add paragraph tag for render
		 */
		/*if(text_to_render.substring(0, 21)!="<p class=\"paragraph\">"){
			text_to_render="<p class=\"paragraph\">"+text_to_render+"</p>";
		}*/
		render_div.innerHTML = text_to_render;

		// ---------------------- add footnote function -------------------------

        let content = document.querySelector('#body-content');
        let render = document.querySelector('#right_pane');

		render.innerHTML = content.value;
		let noteContents = [];
		let notes = document.querySelectorAll('footnote');
		for (let i = 0; i < notes.length; i++) {
			noteContents[i] = notes[i].innerText;
			notes[i].innerHTML = "";
		}

		for (let i = 0; i < notes.length; i++) {
			let noteBtn = document.createElement('button');
			noteBtn.textContent = i;
			noteBtn.className = "footnote-btn-class";

			noteBtn.addEventListener('click', () => {
				alert(noteContents[i]);
			})
			notes[i].appendChild(noteBtn);
		}


		// ------------------------------------------------------------------------
		render_div.style.display = "block";
	}
}
