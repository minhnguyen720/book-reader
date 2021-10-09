package com.ebook.service.Book;

import java.util.List;

import com.ebook.model.Book;

public interface BookDAO {
	public Book setBook(String bookName);
	public List<Book> getAllBooks();
	public Book getBook(int bookID);
	public int updateBook(int bookID, String bookName);
}
