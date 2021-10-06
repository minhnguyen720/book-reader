<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Update chapter</title>
</head>
<body>
	<form action="<%=request.getContextPath()%>/update-chapter" method="post">
		<div> 
		<label id = "chapter">Chapter name:</label>
		<input type = "text" id = "chapterName" name = "chapterName">
		<label id = "chapter">Write chapter:</label>
		<textarea id = "chapterContent" name = "chapterContent" rows="4" cols="50"></textarea>
		<input type="submit" value="update chapter">
		</div>
	</form>
</body>
</html>