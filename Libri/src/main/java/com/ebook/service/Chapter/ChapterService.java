package com.ebook.service.Chapter;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.List;
import java.util.ArrayList;

import com.ebook.model.Chapter;
import com.ebook.ulti.DBConnection;

public class ChapterService implements ChapterDAO{
	
	private String getChapterScript = "SELECT * FROM chapter WHERE ChapterID = ?";
	private String setChapterScript = "INSERT INTO chapter(BookID,ChapterName,chapterContent) VALUES (?,?,?)";
	private String updateChapterScript = "UPDATE chapter SET ChapterName = ?, ChapterContent = ? "
			+ "WHERE ChapterID = ?";
	Chapter chapter = new Chapter();
	
	@Override
	public Chapter getChapter(int chapterID) {
		Connection connection =  DBConnection.getConnection();
		Chapter chapter = new Chapter();
		try {
			
			// get fields of the chapter
			PreparedStatement statement = connection.prepareStatement(getChapterScript);
			statement.setInt(1, chapterID);
			ResultSet rs = statement.executeQuery();
			while(rs.next()) {
				int chapterId = rs.getInt(1);
				int bookID = rs.getInt(2);
				String chapterName = rs.getString(3);
				String chapterContent = rs.getString(4);
				chapter = new Chapter(chapterId, bookID, chapterName, chapterContent);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return chapter;
	}
	
	@Override
	public int setChapter(int bookID, String chapterName, String chapterContent) {
		Connection connection =  DBConnection.getConnection();
		int status = 0;
		
		try {

			// set fields for the chapter
			PreparedStatement statement = connection.prepareStatement(setChapterScript);
			statement.setInt(1, bookID);
			statement.setString(2,chapterName);
			statement.setString(3, chapterContent);
			status = statement.executeUpdate(); 
			connection.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return status; // status = 1 meaning that the chapter is added to DB successfully
		  			  // status = 0 meaning that the chapter is failed to add to DB
	}
	
	@Override
	public int updateChapter(int chapterID, String chapterName, String chapterContent) {
		int status = 0;
		Connection connection = DBConnection.getConnection();
		try {
			
			//set fields for the chapter to update
			PreparedStatement statement = connection.prepareStatement(updateChapterScript);
			statement.setString(1, chapterName);
			statement.setString(2, chapterContent);
			statement.setInt(3, chapterID);
			status = statement.executeUpdate();
			connection.close();
		} catch(SQLException e) {
			e.printStackTrace();
		}
		
		return status; // status = 1 meaning that the chapter is updated to DB successfully
		  			  // status = 0 meaning that the chapter is failed to update to DB
	}
}

