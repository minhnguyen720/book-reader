package com.ebook.servlet;

import javax.servlet.ServletContext;
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

@WebServlet(name = "GetChapter", urlPatterns = "/get-chapter")

public class GetChapter extends HttpServlet {
	private Gson gson = new Gson();
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("application/json; charset=UTF-8");
        
        int chapterID = Integer.parseInt(request.getParameter("ChapterID"));
        ChapterDAO chapterService = new ChapterService();
        Chapter chapter = chapterService.getChapter(chapterID);
        //String htmlString = chapter.getChapterContent();
        String chapterJson = this.gson.toJson(chapter);
        
        // write to front-end
        PrintWriter writer = response.getWriter();
        writer.println(chapterJson);
       
    }
}
