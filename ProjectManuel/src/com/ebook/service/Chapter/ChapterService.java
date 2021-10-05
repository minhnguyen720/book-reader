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
	//private String getChapterScript = "CALL getChapter(?)";
	//private String setChapterScript = "CALL setChapter(?, ?)";
	private String getChapterScript = "SELECT * FROM chapter WHERE ChapterID = ?";
	private String setChapterScript = "INSERT into chapter(BookID,ChapterName,chapterContent) value (?,?,?)";
	Chapter chapter = new Chapter();
	
	@Override
	public Chapter getChapter(int chapterID) {
		Connection connection =  DBConnection.getConnection();
		
		try {
			//CallableStatement statement = connection.prepareCall(getChapterScript);
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
			//CallableStatement statement = connection.prepareCall(setChapterScript);
			PreparedStatement statement = connection.prepareStatement(setChapterScript);
			statement.setInt(1, bookID);
			statement.setString(2,chapterName);
			statement.setString(3, chapterContent);
			status = statement.executeUpdate(); 
			connection.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return status;
	}
}

