package com.ebook.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ebook.model.Chapter;
import com.ebook.service.Chapter.ChapterDAO;
import com.ebook.service.Chapter.ChapterService;
import com.google.gson.Gson;

import java.io.*;

@WebServlet(name = "SetChapter", urlPatterns = "/set-chapter")
public class SetChapter extends HttpServlet {
    protected void doPost(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {
    	// get JSON from front-end
    	
    	Chapter chapter = new Gson().fromJson(request.getReader(), Chapter.class);
    	String chapterContent = chapter.getChapterContent();
    	String chapterName = chapter.getChapterName();
    	int bookID = chapter.getBookID();
    	System.out.println(bookID);
    	System.out.println(chapterName);
    	System.out.println(chapterContent);
    	
    	ChapterDAO chapterDAO = new ChapterService();
    	chapterDAO.setChapter(bookID, chapterName, chapterContent);
    	
    }
    
}
