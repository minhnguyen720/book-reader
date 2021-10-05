package com.ebook.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ebook.service.Chapter.ChapterDAO;
import com.ebook.service.Chapter.ChapterService;

import java.io.*;

@WebServlet(name = "SetChapter", urlPatterns = "/set-chapter")
public class SetChapter extends HttpServlet {
    protected void doPost(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {
    	// get what user type in chapter
    	String divResponse = request.getParameter("response");
    	String chapterName = request.getParameter("chapterName");
    	int bookID = 1;
    	//int bookID = Integer.parseInt(request.getParameter("bookID"));
    	System.out.println(divResponse);
    	
    	ChapterDAO chapter = new ChapterService();
    	chapter.setChapter(bookID, chapterName, divResponse);
    	
    }
    
}
