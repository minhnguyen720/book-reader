package com.ebook.ulti;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	static Connection conn = null;
	static String username="project_java";
	static String pwd="160817";
	static String connectionUrl = "jdbc:mysql://localhost:3306/project";
	
	public static Connection getConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(connectionUrl,username,pwd);
		} catch (Exception e) {
			System.out.println(e);
		}
		return conn;
	}
}