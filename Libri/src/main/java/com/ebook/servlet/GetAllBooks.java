package com.ebook.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ebook.model.Book;
import com.ebook.model.Chapter;
import com.ebook.service.Book.BookDAO;
import com.ebook.service.Book.BookService;
import com.google.gson.Gson;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "GetAllBooks", urlPatterns = "/get-all-books")

public class GetAllBooks extends HttpServlet {
	
	private Gson gson = new Gson();
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {

    	response.setContentType("application/json; charset=UTF-8");
        BookDAO bookService = new BookService();
        List<Book> bookList = bookService.getAllBooks();
        PrintWriter writer = response.getWriter();
        List<String> jsonList = new ArrayList<String>();
        
        for(Book book : bookList) {
        	String json = this.gson.toJson(book);
        	jsonList.add(json);
        }
        writer.println(jsonList); 
       
    }
}
