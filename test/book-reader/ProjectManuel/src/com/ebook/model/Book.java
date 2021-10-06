package com.ebook.model;

import java.util.List;

public class Book {
	private int bookID;
	private String bookName;
	private List<Chapter> chapterList;
	
	public Book(){}
	
	public Book(int bookID, String bookName) {
		this.bookID = bookID;
		this.bookName = bookName;
	}
	
	public int getBookID() {
		return bookID;
	}

	public void setBookID(int bookID) {
		this.bookID = bookID;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public void setChapterList(List<Chapter> chapterList) {
		this.chapterList = chapterList;
	}
	
	public List<Chapter> getChapterList(){
		return chapterList;
	}
	
}
