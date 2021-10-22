package com.ebook.service.Book;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import com.ebook.model.Book;
import com.ebook.model.Chapter;
import com.ebook.service.Book.*;
import com.ebook.ulti.*;

public class BookService implements BookDAO{

	private String getAllBookScript = "SELECT * FROM book";
	private String setBookScript = "INSERT INTO book(BookName) VALUES (?)";
	private String getBookByCodeScript = "SELECT * FROM book WHERE BookID = ?";
	private String getAllChapterScript = "SELECT * FROM chapter WHERE BookID = ?";
	private String updateBookScript = "UPDATE book SET BookName = ? WHERE BookID = ?";
	private String getBookJustAddedScript = "SELECT * FROM book ORDER BY BookID DESC LIMIT 1";
	
	@Override
	public Book setBook(String bookName) {
		Book book = new Book();
		Connection connection = DBConnection.getConnection();
		try {
			// add a book to DB
			PreparedStatement statement = connection.prepareStatement(setBookScript);
			statement.setString(1, bookName);
			statement.executeUpdate(); 
			
			// get the last book added
			statement = connection.prepareStatement(getBookJustAddedScript);
			ResultSet rs = statement.executeQuery();
			while(rs.next()) {
				int bookID = rs.getInt("BookID");
				String BookName = rs.getString("BookName");
				book = new Book(bookID, BookName);
			}
			
			
		} catch (Exception e) {
			System.out.println(e);
		}
		return book; // return the last book added
					  
	}
	
	@Override 
	public List<Book> getAllBooks(){
		Connection connection = DBConnection.getConnection();
		Book book = new Book();
		List<Book> books = new ArrayList<Book>();
		try {
			
			// get fields of a book
			PreparedStatement statement = connection.prepareStatement(getAllBookScript);
			ResultSet rs = statement.executeQuery();
			
			while(rs.next()) {
				int bookID = rs.getInt("BookID");
				String bookName = rs.getString("BookName");
				book = new Book(bookID, bookName);
				books.add(book);
			}
		} catch(Exception e){
			System.out.println(e);
		}
		return books;
	}
	
	@Override
	public Book getBook(int bookID) {
		Connection connection = DBConnection.getConnection();
		Book book = new Book();
		// get book from db
		try {
			
			// get fields of a book
			PreparedStatement statement = connection.prepareStatement(getBookByCodeScript);
			statement.setInt(1, bookID);
			ResultSet rs = statement.executeQuery();
			while(rs.next()) {
				int bookId = rs.getInt("BookID");
				String bookName = rs.getString("BookName");
				book = new Book(bookId, bookName);
			}
			// get all chapters of that book
			List<Chapter> chapterList = new ArrayList<Chapter>();
			statement = connection.prepareStatement(getAllChapterScript);
			statement.setInt(1, bookID);
			rs = statement.executeQuery();
			
			// get fields of each chapter
			while(rs.next()) {
				int chapterId = rs.getInt("ChapterID");
				int bookId = rs.getInt("BookID");
				String chapterName = rs.getString("ChapterName");
				String chapterContent = rs.getString("ChapterContent");
				Chapter chapter = new Chapter(chapterId, bookId, chapterName, chapterContent);
				chapterList.add(chapter);
			}
			
			// add chapters to the book
			book.setChapterList(chapterList);
			
			
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return book;
	}
	
	
	public int updateBook(int bookID, String bookName) {
		int status = 0;
		Connection connection = DBConnection.getConnection();
		try {
			
			//set fields for the book to update
			PreparedStatement statement = connection.prepareStatement(updateBookScript);
			statement.setString(1, bookName);
			statement.setInt(2, bookID);
			status = statement.executeUpdate();
			connection.close();
		} catch(SQLException e) {
			e.printStackTrace();
		}
		
		return status; // status = 1 meaning that the book is updated to DB successfully
		  			  // status = 0 meaning that the book is failed to update to DB
	}
	
}

