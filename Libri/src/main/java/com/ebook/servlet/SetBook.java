package com.ebook.servlet;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ebook.service.Book.BookDAO;
import com.ebook.service.Book.BookService;
import com.google.gson.Gson;
import com.ebook.model.*;

import java.io.*;

@WebServlet(name = "SetBook", urlPatterns = "/set-book")
public class SetBook extends HttpServlet {
	
	private Gson gson = new Gson();
    protected void doPost(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {
    	// get what user type in chapter
    	String bookName = request.getParameter("bookName");
    	System.out.println(bookName);
    	
    	response.setContentType("application/json; charset=UTF-8");
    	BookDAO bookDAO = new BookService();
    	Book book = new Book();
    	book = bookDAO.setBook(bookName);
    	String bookJSONString = this.gson.toJson(book);
    	
    	PrintWriter writer = response.getWriter();
    	writer.println(bookJSONString); // return json of the last book added
    	System.out.println(bookJSONString);
    }
    
}