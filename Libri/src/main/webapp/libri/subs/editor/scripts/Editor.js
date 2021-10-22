import ChaptersView from "./ChaptersView.js";
import EditorAPI from "./EditorAPI.js";

export default class Editor {
    constructor(root) {
        // this class will hold the list of active chapters
        this.chapters = []; // by default there is no exist chapter
        this.activeChapter = null; // by default no active chapter
        this.view = new ChaptersView(root, this._handlers()); // create new editor

        this._refreshChapters(); // update exist chapters
    }

    // update exist chapters
    _refreshChapters() {
        const chapters = EditorAPI.getAllChapters();

        this._setChapters(chapters)
        if(chapters.length > 0) {
            this._setActiveChapter(chapters[0]);
        }
    }

    // call the UI to update what visible and show the chapter
    _setChapters(chapters) {
        this.chapters = chapters;
        // insert all the html for every chapter in the list
        this.view.updateChapterList(chapters);
        // check the array in storage, if there is element, it set to true and show the UI
        this.view.updateChapterPreviewVisibility(chapters.length > 0);
    }

    // show the select chapter
    _setActiveChapter(chapter) {
        this.activeChapter = chapter;
        // provide behavior when a chapter is selected: show editor and the selected chapter is bold in sidebar
        this.view.updateActiveChapter(chapter);
    }

    // return the specific object and pass to the constructor
    _handlers() {
        return {
            onSelect: chapterId => {
                // find the chapter with the id we pass in and set it is active
                const selectedChapter = this.chapters.find(chapter => chapter.chapterID == chapterId);
                this._setActiveChapter(selectedChapter);
            },

            onAdd: () => {
                const newChapter = {
                    title: "Enter title",
                    body: "Enter body"
                };

                EditorAPI.saveChapter(newChapter);
                this._refreshChapters();
            },

            // title and body take from UI
            onEdit: (title,body) => {
	
				// rewrite this part using update-chapter api, cannot use saveChapter method at this point
                /*EditorAPI.saveChapter({
                    id: this.activeChapter.chapterID,
                    title: chapterName,
                    body: chapterContent
                });*/


				const chapterID = this.activeChapter.chapterID;
				const chapterName = title;
				const chapterContent = body;
				let postJSON = {
					"chapterID" : chapterID,
					"chapterName" : chapterName,
					"chapterContent" : chapterContent,
				};
				$.ajax({
					type : 'POST',
					contentType: "application/json",
     				url: "http://localhost:10001/Libri/update-chapter",
      				data: JSON.stringify(postJSON),
      				dataType: "text",
					success : function(){
						alert("Edit chapter successfully!");
					},
					error : function(){
						alert("Fail to edit chapter!");
					}
				});
				
                this._refreshChapters();
            },

        };
    }
}