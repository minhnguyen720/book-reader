let chapters = [];
 
export default class EditorAPI {
    static getAllChapters() {
// consider rewrite here, call get-book?BookID= api here to return all chapters name
			const BookID = localStorage.getItem("selectedEditBookID");
			const api = "http://localhost:10001/Libri/get-book?BookID=" + BookID;
			$.get(api, function (data) {
    			const obj = JSON.parse(JSON.stringify(data));
 	 		});
	
			$.ajax({
				type: "GET",
				url: "http://localhost:10001/Libri/get-book?BookID=" + BookID,
				async: false,
				success: function(data){
					chapters = JSON.parse(JSON.stringify(data));
				}, 
				error: function(){
					alert("Error");
					
				},
			});
        return chapters;
    }

    static saveChapter(chapterToSave) {
        // get all the exist chapters
        const chapters = EditorAPI.getAllChapters();
    
		const bookID = localStorage.getItem("selectedEditBookID");
		const chapterName = chapterToSave.chapterName;
		const chapterContent = chapterToSave.chapterContent;
		let postJSON = {
			"bookID" : bookID,
			"chapterName" : chapterName,
			"chapterContent" : chapterContent,
		};
		$.ajax({
			type : 'POST',
			contentType: "application/json",
     		url: "http://localhost:10001/Libri/set-chapter",
      		data: JSON.stringify(postJSON),
      		dataType: "text",
			success : function(){
				alert("Add new chapter successfully!");
			},
			error : function(){
				alert("Fail to add new chapter!");
			}
		})
        // set a key and a value in the local storage
        //localStorage.setItem("editor-chapters", JSON.stringify(chapters));
    }
}