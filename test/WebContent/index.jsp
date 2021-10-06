<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ page import = "com.ebook.model.Chapter" %>
<%@ page import = "com.ebook.model.Book" %>
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
		<label>Chapter name:</label>
		<input type = "text" id = "chapterName" name = "chapterName">
		
		<label>Write chapter:</label>
		<textarea id = "chapterContent" name = "chapterContent" rows="4" cols="50"></textarea>
		<input type="submit" value="set chapter">
		<br></br>
		<a href = "index.jsp">Insert new chapter</a>
		<br></br>
		<a href = "update.jsp">Update chapter </a>
		<br></br>
		<a href = "insertBook.jsp">Insert new book</a>
		<br></br>
		
		</div>
	</form>
 	
 	<form action="<%=request.getContextPath()%>/get-all-books" method="get">
 	<input type="submit" value="show all books">
 	</form>
	 <%
	//Book book = (Book) request.getAttribute("book");
	//int BookID = book.getBookID();
	
	%>
	
	
</body>
</html>

 