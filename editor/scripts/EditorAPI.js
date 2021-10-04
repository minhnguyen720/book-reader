export default class EditorAPI {
    static getAllChapters() {
        /**
         * If there are some chapter, return value of key "editor-chapters"
         * if there is no chapter exist, return empty array to store new value
        */
        const chapters = JSON.parse(localStorage.getItem("editor-chapters") || "[]");

        return chapters;
    }


    static saveChapter(chapterToSave) {
        // get all the exist chapters
        const chapters = EditorAPI.getAllChapters();
        // find if the chapter exist by checking its id
        // go through every chapter id and compare to the id that you pass in
        const existing = chapters.find(chapter => chapter.id == chapterToSave.id);

        // if chapter exist, update the selected chapter title and body
        // if chapter is not exist, create new id and save the
        if (existing) {
            existing.title = chapterToSave.title;
            existing.body = chapterToSave.body;

        } else {
            chapterToSave.id = Math.floor(Math.random() * 100000);
            // Array push(): push item to the end of the array
            chapters.push(chapterToSave);
        }
        console.log(JSON.stringify(chapters))
        // set a key and a value in the local storage
        localStorage.setItem("editor-chapters", JSON.stringify(chapters));
    }

    static deleteChapter(id) {
        // get all the exist chapters
        const chapters = EditorAPI.getAllChapters();
        /** Go through every id of exist chapter and take those that do not match the given id
         * Array filter(): method creates an array filled with all array elements that pass a test (provided by a function).
        */
        const newChapters = chapters.filter(chapter => chapter.id != id);

        // set the key and the new value that pass the filter
        localStorage.setItem("editor-chapters", JSON.stringify(newChapters));
    }
}