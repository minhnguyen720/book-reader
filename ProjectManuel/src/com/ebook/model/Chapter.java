package com.ebook.model;

public class Chapter {
	private int chapterID;
	private int bookID;
	private String chapterName;
	private String chapterContent;
	
	public Chapter() {}
	
	public Chapter(int chapterID, int bookID, String chapterName, String chapterContent) {
		this.chapterID = chapterID;
		this.bookID = bookID;
		this.chapterName = chapterName;
		this.chapterContent = chapterContent;
	}
	
	public int getChapterID() {
		return chapterID;
	}
	public void setChapterID(int chapterID) {
		this.chapterID = chapterID;
	}
	public int getBookID() {
		return bookID;
	}
	public void setBookID(int bookID) {
		this.bookID = bookID;
	}
	public String getChapterName() {
		return chapterName;
	}
	public void setChapterName(String chapterName) {
		this.chapterName = chapterName;
	}
	public String getChapterContent() {
		return chapterContent;
	}
	public void setChapterContent(String chapterContent) {
		this.chapterContent = chapterContent;
	}
	
	
}
