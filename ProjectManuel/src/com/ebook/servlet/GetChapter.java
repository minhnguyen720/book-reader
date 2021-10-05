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

import java.io.*;

@WebServlet(name = "GetChapter", urlPatterns = "/get-chapter")

public class GetChapter extends HttpServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        
        int chapterID = Integer.parseInt(request.getParameter("chapterID"));
        ChapterDAO chapterService = new ChapterService();
        Chapter chapter = chapterService.getChapter(chapterID);
        String htmlString = chapter.getChapterContent();
        
        // write to front-end
        PrintWriter writer = response.getWriter();
        writer.println(htmlString);
       
    }
}
