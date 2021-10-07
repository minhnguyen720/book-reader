const createBtn = document.querySelector('.create-btn');
const table = document.querySelector('.table-body');

let titleInput = document.getElementById("title");
let index = 0;
let books = [];

const list = JSON.parse(localStorage.getItem("book-list") || "[]");
let searchIndex = 0;
let matchingList = [];
let searchBarBtn = document.querySelector('.search-bar_btn');
let searchBar = document.querySelector('.search-bar_text');

// render table
_render();
searchBarBtn.addEventListener('click', () => {
    let searchInput = document.querySelector('.search-bar_text').value;
    if (searchInput == "") {
        table.innerHTML = "";
        _render();
    } else {
        const matching = list.find(book => book.title == searchInput);
        if (matching) {
            matchingList[index] = matching;
            _createBook(matching.title, matching.id);
            table.innerHTML = "";
            _searchResult(matchingList);
        }
        searchBar.value = "";
    }
})

function _searchResult(matchingList) {
    // get array list in local storage and parse to JSON object
    // loop through the list to render item in the list
    for (const book of matchingList) {
        const html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
    }
}

createBtn.addEventListener('click', () => {
    if (titleInput.value == "") {
        alert("ERROR: NO TITLE DETECT");
    } else {
        let book = {
            title: titleInput.value,
            id: Math.floor(Math.random() * 10000)
        }
        let html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
        // push the book into the list
        // books.push(book);
        books[index] = book;
        index++;
        // set new book to local storage
        localStorage.setItem("book-list", JSON.stringify(books));
        titleInput.value = "";

    }
})

function _createBook(title, id) {
    return `
        <tr onclick="location.href='/libri/subs/editor/editor.html';">
            <td scope="row">${title}</td>
            <td scope="row">${id}</td>
        </tr>
        `
}

function _render() {
    // get array list in local storage and parse to JSON object
    const list = JSON.parse(localStorage.getItem("book-list") || "[]");
    // loop through the list to render item in the list
    for (const book of list) {
        const html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
    }
}