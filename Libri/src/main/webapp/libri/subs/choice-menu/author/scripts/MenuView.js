const createBtn = document.querySelector('.create-btn');
const table = document.querySelector('.table-body');

let titleInput = document.getElementById("title");
let index = 0;
let books = [];

//const list = JSON.parse(localStorage.getItem("book-list") || "[]");
//let searchIndex = 0;
//let matchingList = [];
//let searchBarBtn = document.querySelector('.search-bar_btn');
//let searchBar = document.querySelector('.search-bar_text');

showBooks();

function showBooks(){
	const api = "http://localhost:10001/Libri/get-all-books";
	getAllBooks(api);
}

function clickAndSaveID(){
	$("body").on("click", ".book", function () {
    	let id = $(this).attr("id");
    	localStorage.setItem("selectedEditBookID",id)
  	});
}

function getAllBooks(api){
	$(function () {
	//const api = "http://localhost:10001/Libri/get-all-books";
	$.get(api, function (data) {
    const obj = JSON.parse(JSON.stringify(data));
    obj.map((val)=>{
		$(`
			<tr onclick="location.href='/Libri/libri/subs/editor/editor.html';" class="book" id = "${val.bookID}" >
	         <td scope="row">${val.bookName}</td>
	         <td scope="row">${val.bookID}</td>
	         
	     </tr>
		`).appendTo(".table-body")
	});

  });
	clickAndSaveID();
  });
	
}

createBtn.addEventListener('click', () => {
    if (titleInput.value == "") {
        alert("ERROR: NO TITLE DETECT");
    } else {
	
		let title = titleInput.value;
		console.log(title);
		
		const api = "http://localhost:10001/Libri/set-book?BookName=" + title;
		//console.log(api);
		$.get(api, function (data) {
			//console.log("a");
			//console.log(api);
   		const obj = JSON.parse(JSON.stringify(data));
		let bookName = obj.bookName;
		let bookID = obj.bookID;
	let html = `
        <tr onclick="location.href='/Libri/libri/subs/editor/editor.html';" class="book" id = "${bookID}">
            <td scope="row">${bookName}</td>
            <td scope="row">${bookID}</td>
        </tr>
        `
	table.insertAdjacentHTML("beforeend", html);
  		});
    }
});

function _searchResult(matchingList) {
    // get array list in local storage and parse to JSON object
    // loop through the list to render item in the list
    for (const book of matchingList) {
        const html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
    }
}
