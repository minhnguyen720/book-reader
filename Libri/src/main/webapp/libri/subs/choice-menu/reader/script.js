$(function () {
	const api = "http://localhost:10001/Libri/get-all-books";
	$.get(api, function (data) {
    const obj = JSON.parse(JSON.stringify(data));
    obj.map((val)=>{
		$(`
			<tr onclick="location.href='/Libri/libri/subs/reader/index.html?BookID=' + ${val.bookID}" class="book" id = "${val.bookID}" >
	         <td scope="row">${val.bookName}</td>
	         <td scope="row">${val.bookID}</td>
	         
	     </tr>
		`).appendTo(".table-body")
	});

  });
	$("body").on("click", ".book", function () {
    	let id = $(this).attr("id");
    	localStorage.setItem("selectedReadBookID",id)
  	});
  });
