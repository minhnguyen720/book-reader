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

@WebServlet(name = "UpdateChapter", urlPatterns = "/update-chapter")
public class UpdateChapter extends HttpServlet {
    protected void doPost(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {
    	// get what user type in chapter
    	String chapterName = request.getParameter("chapterName");
    	String chapterContent = request.getParameter("chapterContent");
    	int chapterID = 9;
    	//int chapterID = Integer.parseInt(request.getParameter("bookID"));
    	System.out.println(chapterContent);
    	
    	ChapterDAO chapter = new ChapterService();
    	chapter.updateChapter(chapterID, chapterName, chapterContent);
    	
    }
    
}
