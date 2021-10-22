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

@WebServlet(name = "GetBook", urlPatterns = "/get-book")

public class GetBook extends HttpServlet {
	private Gson gson = new Gson();
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("application/json; charset=UTF-8");
        
//        BufferedReader reader = request.getReader();
//        Gson gson = new Gson();
//        
//        Book receivedBook = gson.fromJson(reader, Book.class);
//        System.out.println(receivedBook.getBookID());
        
        
       // int bookID = receivedBook.getBookID();
        int bookID = Integer.parseInt(request.getParameter("BookID"));
        BookDAO bookService = new BookService();
        Book book = bookService.getBook(bookID);
        List<String> jsonList = new ArrayList<String>();
        
        // write to front-end
        PrintWriter writer = response.getWriter();
        
        for(Chapter chapter : book.getChapterList()) {
        	String json = this.gson.toJson(chapter);
        	jsonList.add(json);
        }
       writer.println(jsonList);
    }
}