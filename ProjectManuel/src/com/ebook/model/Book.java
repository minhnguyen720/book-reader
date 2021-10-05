package com.ebook.model;

public class Book {
	private int bookID;
	private String bookName;
	
	public Book(String bookID, String bookName) {
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

}
