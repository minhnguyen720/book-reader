<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

	<form action="<%=request.getContextPath()%>/set-book" method="post">
		<div> 
		<label>Book name:</label>
		<input type = "text" id = "bookName" name = "bookName">
		<button onclick = "callAjax()"> Set book </button>
		</div>
	</form>
	
 	< script>
		function callAjax() {
			let requestURL = "" ;
			let request = new XMLHTTPRequest();
			request.open('GET', requestURL);
			request.responseType = 'json';
			request.send();
		
		
		}
	</ script>
</body> 
</html>