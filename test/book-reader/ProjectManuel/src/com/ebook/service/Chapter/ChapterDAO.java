package com.ebook.service.Chapter;

import java.util.List;
import com.ebook.model.*;

public interface ChapterDAO {
	public Chapter getChapter(int chapterID);
	public int setChapter(int bookID, String chapterName, String chapterContent);
	public int updateChapter(int chapterID, String chapterName, String chapterContent);
}
