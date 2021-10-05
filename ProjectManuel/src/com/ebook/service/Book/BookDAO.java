package com.ebook.service.Book;

import java.util.List;

import com.ebook.model.Book;

public interface BookDAO {
	public void insertBookToDB(Book book);
	public List<Book> getBooks(String bookName);
}
