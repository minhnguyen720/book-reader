<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ page import = "com.ebook.model.Chapter" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert book</title>
</head>
<body>
	<!-- <form>
		<div>
			<label id="bookname-label">Book name:</label>
			<input type="text" id="bookName" name="bookName" placeholder="Enter the book name" required>
		</div>
		<div>
			<button type="submit" id="addBook" name="addBook" value="addBook">Add Book</button>
		</div>
	</form> -->
	
	<form action="<%=request.getContextPath()%>/set-chapter" method="post">
		<div> 
		<label id = "chapter">Chapter name:</label>
		<input type = "text" id = "chapterName" name = "chapterName">
		<label id = "chapter">Write chapter:</label>
		<textarea id = "response" name = "response" rows="4" cols="50"></textarea>
		<input type="submit" value="set chapter">
		</div>
	</form>
 	
	<%-- <%
	Chapter chapter = (Chapter) request.getAttribute("chapter");
	int id = chapter.getChapterID();
	%>
	
	<a href="<%="/get-chapter?chapterID=" + id%>"></a> <br/>  --%>
	
	
</body>
</html>

 