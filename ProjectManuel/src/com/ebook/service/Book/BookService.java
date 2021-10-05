package com.ebook.service.Book;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import com.ebook.model.Book;
import com.ebook.service.Book.*;
import com.ebook.ulti.*;

public class BookService implements BookDAO{
	
	Connection conn;
	CallableStatement callablStatement;
	PreparedStatement preparedStatement;
	
	@Override
	public void insertBookToDB(Book book) {
		try {
			conn = DBConnection.getConnection();
			preparedStatement = conn.prepareStatement("insert into book (BookName) values(?)");
			preparedStatement.setString(1, book.getBookName());
			preparedStatement.executeUpdate();
			conn.close();
			
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	
	@Override 
	public List<Book> getBooks(String bookName){
		List<Book> books = new ArrayList<>();
		//String json = null;
		try {
			conn = DBConnection.getConnection();
			callablStatement = conn.prepareCall("CALL getBook(?)");
			
			ResultSet rs = callablStatement.executeQuery();
			
			//json = (String) ObjectConverter.toJSON(rs);
			//return json;
			
			while(rs.next()) {
				//books.add(new Book(rs.getString("BookName")));
			}
			
			
			
		} catch(Exception e){
			System.out.println(e);
		}
		return books;
	}
}

