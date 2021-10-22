// Get the location if the bookmark and store inside the local storage

// Note add to key bookID and ChapterID to differentiate
//Parameter searcher for the URL
window.onbeforeunload = saveLastLocation;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookID = urlParams.get('BookID');
let currentChapterID;
let fontSizePx = 16;
let count = 0;
let font;

$(function() {
	const BookID = localStorage.getItem("selectedReadBookID");
	
	renderFootnote()
	
	// call api to get all chapters of selected book
	$.ajax({
		type: "GET",
		url: "http://localhost:10001/Libri/get-book?BookID=" + BookID,
		async: false,
		success: function(data) {
			const obj = JSON.parse(JSON.stringify(data));
			// map chapters to html
			obj.map((val) => {
				$(`
	         		<h3 class = "chapter" id="${val.chapterID}"> ${val.chapterName} </h3>
				`).appendTo(".reader_list")
			});

		},
		error: function() {
			alert("Error");

		},
	});
	// render chapterContent when click to choose a chapter
	$(".reader_list").on("click", ".chapter", function() {
		let chapterID = $(this).attr("id");
		currentChapterID = chapterID;
		count = 0;
		font = null;
		fontSizePx = 16;
		$.ajax({
			type: "GET",
			url: 'http://localhost:10001/Libri/get-chapter?ChapterID=' + chapterID,
			asyn: false,
			success: function(data) {
				chapter = JSON.parse(JSON.stringify(data));
				let content = chapter.chapterContent;
				let chapterID = chapter.chapterID;
				let bookID = chapter.bookID;
				localStorage.setItem('recentChapterIdOfBook' + bookID, chapterID);
				let output = document.getElementById('output');
				output.innerHTML = content;
				renderFootnote(); // FIXED: when change chapter the footnotes are not updated.
				// Load the reader modification to the chapter
				insertMarkTag();
				renderBookmarkButton();
				loadFontProperty();
				//Scroll back to the top of the chapter
				scorllToLocation(0, null);
			},
			error: function() {
				alert("Error");
			},
		});
	});
});

loadRecentChapter();
insertMarkTag();
renderBookmarkButton();
loadFontProperty();
loadSavedLocation();

function scorllToLocation(paragraph, element) {
	let paraList = document.getElementsByClassName('paragraph');
	//console.log(paraList);
	let markLocation = paraList[paragraph];
	//console.log(markLocation, paragraph);
	//console.log(paraList[0]);
	if (element != null) {
		let eleList = paraList[paragraph].children;

		markLocation = eleList[element];
	}
	markLocation.scrollIntoView({
		behavior: 'smooth'
	});
}


function loadSavedLocation() {
	let savedData = JSON.parse(localStorage.getItem('lastLocation' + bookID));
	scorllToLocation(savedData.paraNum, savedData.eleNum);
}

function loadRecentChapter() {
	const bookID = localStorage.getItem("selectedReadBookID");
	const chapterID = localStorage.getItem('recentChapterIdOfBook' + bookID);
	//console.log(chapterID);
	const api = 'http://localhost:10001/Libri/get-chapter?ChapterID=' + chapterID;
	currentChapterID = chapterID;

	$.ajax({
		type: "GET",
		url: 'http://localhost:10001/Libri/get-chapter?ChapterID=' + chapterID,
		async: false,
		success: function(data) {
			chapter = JSON.parse(JSON.stringify(data));
			let content = chapter.chapterContent;
			//console.log(content);
			let output = document.getElementById('output');
			output.innerHTML = content;

		},
		error: function() {
			//alert("Error");
			console.log("No recent chapter to load");

		},
	});
	// commented this part:
	//saveLastLocation();
	/*loadSavedLocation();
	insertMarkTag();
	renderBookmarkButton();
	loadFontProperty();*/
}

function renderFootnote() {
	let notes = document.querySelectorAll('footnote');
	let noteContents = [];
	for (let i = 0; i < notes.length; i++) {
		noteContents[i] = notes[i].innerText;
		notes[i].innerText = "";

		let footnoteBtn = document.createElement('button');
		footnoteBtn.textContent = i;
		footnoteBtn.className = "footnote-btn-class";
		notes[i].appendChild(footnoteBtn);
	}

	let footnoteBtns = document.querySelectorAll('.footnote-btn-class');
	for (let i = 0; i < notes.length; i++) {
		footnoteBtns[i].addEventListener('click', () => {
			alert(noteContents[i]);
		})
	}
}

function saveLastLocation() {
	flag = false;

	let paragraphList = document.getElementsByClassName('paragraph');
	for (let i = 0; i < paragraphList.length; i++) {
		let node = paragraphList[i].children;
		// check element to load better accuracy of the bookmark
		for (let j = 0; j < node.length; j++) {
			if (isVisible(node[j]) == true && flag == false) {
				LastLocation(i, j)
				flag = true;
				break;
			}
		}
		if (flag == true) break;
		console.log('paragraph: ' + i + ': ' + isVisible(paragraphList[i]))
		// For cases where the paragraph has no child elements
		if (isVisible(paragraphList[i])) {
			LastLocation(i, null);
			flag = true;
		}
		if (flag == true) break;
	}
}

function isVisible(element) {
	var rect = element.getBoundingClientRect();
	var elemTop = rect.top;
	var elemBottom = rect.bottom;

	// Only completely visible elements return true:
	var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
	// Partially visible elements return true:
	//isVisible = elemTop < window.innerHeight && elemBottom >= 0;
	return isVisible;
}

function LastLocation(paraNum, eleNum) {
	//let bookID = localStorage.getItem("selectedReadBookID");
	let section = {
		'paraNum': paraNum,
		'eleNum': eleNum
	};
	localStorage.setItem('lastLocation' + bookID, JSON.stringify(section));
}


//add bookmark

function bookmarkSection() {
	flag = false;
	let paragraphList = document.getElementsByClassName('paragraph');
	for (let i = 0; i < paragraphList.length; i++) {
		let node = paragraphList[i].children;
		// check element to load better accuracy of the bookmark
		for (let j = 0; j < node.length; j++) {
			if (isVisible(node[j]) == true && flag == false) {
				saveBookmark(i, j)
				flag = true;
				break;
			}
		}
		if (flag == true) break;
		//console.log('paragraph: ' + i + ': ' + isVisible(paragraphList[i]))
		// For cases where the paragraph has no child elements
		if (isVisible(paragraphList[i])) {
			saveBookmark(i, null);
			flag = true;
		}
		if (flag == true) break;
	}
}
function renderBookmarkButton() {
	let savedData = JSON.parse(localStorage.getItem('bookmark_BookID' + bookID + 'ChapterID' + currentChapterID)) || [];
	let list = document.getElementById('bookmarkList');
	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}
	for (let i = 0; i < savedData.length; i++) {
		let btn = document.createElement('button')
		btn.innerHTML = i;
		btn.addEventListener('click', function() { scorllToLocation(savedData[i].paraNum, savedData[i].eleNum) })
		list.appendChild(btn);
	}
}


function saveBookmark(paraNum, eleNum) {
	let savedData = JSON.parse(localStorage.getItem('bookmark_BookID' + bookID + 'ChapterID' + currentChapterID)) || [];
	let bookmark = { 'paraNum': paraNum, 'eleNum': eleNum }
	savedData.push(bookmark);
	localStorage.setItem(('bookmark_BookID' + bookID + 'ChapterID' + currentChapterID), JSON.stringify(savedData));
}
function deleteBookmark(index) {
	let savedData = JSON.parse(localStorage.getItem('bookmark_BookID' + bookID + 'ChapterID' + currentChapterID)) || [];
	savedData.splice(index, 1)
	localStorage.setItem('bookmark_BookID' + bookID + 'ChapterID' + currentChapterID, JSON.stringify(savedData));
}

// Convert string length to HTML string length
function findCharacter(paraLoco, position) {
	let flag = true
	let index = 0;
	let i = 0;
	let temp_string = "";
	let list = document.getElementsByClassName('paragraph'); // HTML string
	let paragraph = list[paraLoco].innerHTML;
	while (index < position) {
		if (paragraph.charAt(i - 1) == '>') {
			flag = true;
		}
		if (paragraph.charAt(i) == '<') {
			flag = false;
		}
		if (flag == true) {
			index++;
			temp_string += paragraph.charAt(i);
		};
		i++;
	}
	return i;
}

function highlight() {
	let start = 0
	let end = 0
	// let element = document.getElementById('paragraph');
	var sel = window.getSelection && window.getSelection();
	let list = document.getElementsByClassName('paragraph');
	for (let i = 0; i < list.length; i++) {
		if (sel && sel.rangeCount > 0) {
			// Get location and text info // Not working properly
			let range = sel.getRangeAt(0);
			let paraRange = range.cloneRange();
			paraRange.selectNodeContents(list[i]);
			paraRange.setEnd(range.startContainer, range.startOffset);
			start = paraRange.toString().length;
			paraRange.setEnd(range.endContainer, range.endOffset);
			end = paraRange.toString().length;
			console.log(list[i].textContent)
			// Checks to avoid conflict before saving data
			if (start != end && start < list[i].textContent.length && end < list[i].textContent.length) {
				saveHighlightLocation(i, start, end);
				mergeHighlightData();
				removeAllHighlight();
				insertMarkTag();
			}
		}
	}

}

function insertMarkTag() {
	let savedData = JSON.parse(localStorage.getItem('highligh_BookID' + bookID + 'ChapterID' + currentChapterID)) || [];
	for (let i = 0; i < savedData.length; i++) {
		let list = document.getElementsByClassName('paragraph');
		let paragraph = list[savedData[i].paragraph].innerHTML;
		let startP = findCharacter(savedData[i].paragraph, savedData[i].start);
		let endP = findCharacter(savedData[i].paragraph, savedData[i].end);
		paragraph = paragraph.slice(0, startP) + '<mark>' + paragraph.slice(startP, endP) + '</mark>' + paragraph.slice(endP, paragraph.length);
		list[savedData[i].paragraph].innerHTML = paragraph;
	}
}

function saveHighlightLocation(paragraph, start, end) {
	let savedData = JSON.parse(localStorage.getItem('highligh_BookID' + bookID + 'ChapterID' + currentChapterID)) || [];
	let position = {
		'paragraph': paragraph,
		'start': start,
		'end': end
	}
	savedData.push(position);
	localStorage.setItem(('highligh_BookID' + bookID + 'ChapterID' + currentChapterID), JSON.stringify(savedData));
}

function removeAllHighlight() {
	let list = document.getElementsByClassName('paragraph');
	for (let i = 0; i < list.length; i++) {
		let markedList = list[i].getElementsByTagName('mark');
		console.log(markedList.length)
		while (markedList.length > 0) {
			markedList[0].outerHTML = markedList[0].innerHTML;
		}
	}

}
// Check if saved highlight JSON has any overlap and resolve the overlap by merging into one
// Check for highlighting
function mergeHighlightData() {
	let savedData = JSON.parse(localStorage.getItem('highligh_BookID' + bookID + 'ChapterID' + currentChapterID)) || [];
	for (let i = 0; i < savedData.length; i++) {
		let start_select = savedData[i].start;
		let end_select = savedData[i].end;
		let para_select = savedData[i].paragraph;
		for (let j = 0; j < savedData.length; j++) {
			let start = savedData[j].start;
			let end = savedData[j].end;
			let para = savedData[j].paragraph;
			if (para_select == para) {
				if (start <= start_select && start_select < end && end < end_select) {
					let position = {
						'paragraph': para,
						'start': start,
						'end': end_select
					}
					savedData.splice(i, 1, position)
					savedData.splice(j, 1)
				}
				if (start_select <= start && start < end_select && end_select < end) {
					let position = {
						'paragraph': para,
						'start': start_select,
						'end': end
					}
					savedData.splice(i, 1, position)
					savedData.splice(j, 1)
				}
				if (start < start_select && start_select < end_select && end_select < end) {
					let position = {
						'paragraph': para,
						'start': start,
						'end': end
					}
					savedData.splice(i, 1, position)
					savedData.splice(j, 1)
				}
				if (start_select < start && start < end && end < end_select) {
					let position = {
						'paragraph': para,
						'start': start_select,
						'end': end_select
					}
					savedData.splice(i, 1, position)
					savedData.splice(j, 1)
				}
			}

		}
	}
	localStorage.setItem(('highligh_BookID' + bookID + 'ChapterID' + currentChapterID), JSON.stringify(savedData));
}

function selectUnhighlight() {
	let start = 0
	let end = 0
	let list = document.getElementsByClassName('paragraph');
	var sel = window.getSelection && window.getSelection();

	for (let i = 0; i < list.length; i++) {
		if (sel && sel.rangeCount > 0) {
			let range = sel.getRangeAt(0);
			let paraRange = range.cloneRange();
			paraRange.selectNodeContents(list[i]);
			paraRange.setEnd(range.startContainer, range.startOffset);
			start = paraRange.toString().length;
			paraRange.setEnd(range.endContainer, range.endOffset);
			end = paraRange.toString().length;
		}
		if (start != end && start < list[i].textContent.length && end < list[i].textContent.length) {
			unhighlight(i, start, end);
			mergeHighlightData();
			removeAllHighlight();
			insertMarkTag();
		}
	}

}
// Function to get data from highlight array and append data approriately
function unhighlight(paragraph, start, end) {
	let savedData = JSON.parse(localStorage.getItem(('highligh_BookID' + bookID + 'ChapterID' + currentChapterID))) || [];
	for (let i = 0; i < savedData.length; i++) {
		let start_select = savedData[i].start;
		let end_select = savedData[i].end;
		let para_select = savedData[i].paragraph;
		if (para_select == paragraph) {
			if (start <= start_select && start_select < end && end < end_select) {
				let position = {
					'paragraph': paragraph,
					'start': end,
					'end': end_select
				}
				savedData.splice(i, 1, position)
			}
			if (start_select <= start && start < end_select && end_select < end) {
				let position = {
					'paragraph': paragraph,
					'start': start_select,
					'end': start
				}
				savedData.splice(i, 1, position)
			}
			if (start <= start_select && start_select < end_select && end_select <= end) {
				savedData.splice(i, 1)
			}
			if (start_select <= start && start < end && end < end_select) {
				let position1 = {
					'paragraph': paragraph,
					'start': start_select,
					'end': start
				}
				let position2 = {
					'paragraph': paragraph,
					'start': end,
					'end': end_select
				}
				savedData.splice(i, 1, position1, position2)
			}
		}
	}
	localStorage.setItem(('highligh_BookID' + bookID + 'ChapterID' + currentChapterID), JSON.stringify(savedData));
}

function getElementIndex(node) {
	var index = 0;
	while ((node = node.previousElementSibling)) {
		index++;
	}
	return index;
}

//let fontSizePx = 16;

function changeFontSize(inputScale) {
	/**
	 * if inputScale < 1: scale down, otherwise, it is scale up
	 */
	if (inputScale < 1) {
		fontSizePx -= 3;
		count--;
	}

	else {
		fontSizePx += 3;
		count++;
	}

	let fontTag = document.querySelectorAll("font, span, p");
	// if a plain text pass in, add tag p to the paragraph
	console.log(fontTag.length)
	if (fontTag.length == 0) {
		let p = document.createElement('P');
		let output = document.getElementById('output');
		p.innerHTML = output.innerHTML;
		output.style.fontSize = fontSizePx + "px";

	} else {
		for (let i = 0; i < fontTag.length; i++) {
			let fontSize = fontTag[i].getAttribute('size')
			if (fontSize != null) {
				if (fontSize == 0) {
					fontSize = 3
				}
				fontTag[i].setAttribute('size', fontSize * inputScale)
			}
			else { // this part is for <p> tag, idea is add 'style' attribute and then modify its properties
				/**
				 * if there is no attribute style in the tag, create one
				 * else: increase the fontSizePx value in the style attribute
				 */
				if (fontTag[i].getAttribute('style') == null) {
					let att = document.createAttribute('style')
					att.value = "font-size: " + fontSizePx + "px";
					fontTag[i].setAttributeNode(att);
				} else {
					fontTag[i].style.fontSize = fontSizePx + "px";
				}
			}
		}
	}
}

function saveFontProperty() {
	let property = {
		'count': count,
		'font': font
	};

	localStorage.setItem('stylePropertyBookID' + bookID + 'ChapterID' + currentChapterID, JSON.stringify(property));
}

function loadFontProperty() {
	let property = JSON.parse(localStorage.getItem('stylePropertyBookID' + bookID + 'ChapterID' + currentChapterID));
	if (property.count != null && property.count > 0) {
		for (let i = 0; i < property.count; i++) {
			changeFontSize(1);
		}
	}
	if (property.count != null && property.count < 0) {
		for (let i = 0; i > property.count; i--) {
			changeFontSize(-1);
		}
	}
	if (property.font != null) {
		changeFontType(property.font);
	}
	count = property.count;
	font = property.font;
}


function changeFontType(inputType) {
	// get font tag
	font = inputType;
	let fontTag = document.querySelectorAll("font,p");
	/** in each fontTag get attribute face
	 * if exist: set attribute face = inputType
	 * if is not exist: create attribute face and set temp value for it
	 * and then set face = inputType
	 */
	if (fontTag.length == 0) {
		let p = document.createElement('P');
		let output = document.getElementById('output');
		p.innerHTML = output.innerHTML;
		output.style.fontFamily = inputType;
	}
	for (let i = 0; i < fontTag.length; i++) {
		fontTag[i].style.fontFamily = inputType;
	}
}



