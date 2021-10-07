const table = document.querySelector('.table-body');
let searchBarBtn = document.querySelector('.search-bar_btn');
let searchBar = document.querySelector('.search-bar_text');
const list = JSON.parse(localStorage.getItem("book-list") || "[]");
let matchingList = [];
let index = 0;

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

function _render() {
    // get array list in local storage and parse to JSON object
    // loop through the list to render item in the list
    for (const book of list) {
        const html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
    }
}

function _searchResult(matchingList) {
    // get array list in local storage and parse to JSON object
    // loop through the list to render item in the list
    for (const book of matchingList) {
        const html = _createBook(book.title, book.id);
        table.insertAdjacentHTML("beforeend", html);
    }
}

function _createBook(title, id) {
    return `
        <tr onclick="location.href='/libri/subs/editor/editor.html';">
            <td scope="row">${title}</td>
            <td scope="row">${id}</td>
        </tr>
        `
}