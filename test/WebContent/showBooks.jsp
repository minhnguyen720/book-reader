<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.List" %>
<%@ page import="com.ebook.model.Book" %>
<%@page import="java.util.List"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Show all books: </title>
</head>
<body>
	
<%-- 	<% List<Book> bookList = (List<Book>) request.getAttribute("bookList"); %>
	<% for(Book book : bookList) { %>
            <%
                String name = book.getBookName();
            %>
            
            
	<% } %> --%>
	
	
	
	
	<table>
	
	
	<%List<Book> books = (List<Book>) request.getAttribute("bookList");
        for(Book book : books){%>
        <%-- Arranging data in tabular form --%>
        
            <tr>
                <td><%=book.getBookName()%></td>
                
            </tr>
            <%}%>
            
     </table>
    
</body>
</html>