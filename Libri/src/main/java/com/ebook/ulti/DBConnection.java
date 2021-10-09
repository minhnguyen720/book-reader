package com.ebook.ulti;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	static Connection conn = null;
	static String username = "root";
	static String pwd = "_uN6yeCz4FHZzhe9&bdb";
	static String connectionUrl = "jdbc:mysql://localhost:3306/db";
	
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