package com.ebook.ulti;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	static Connection conn = null;
	static String username="root";
	static String pwd="1234";
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