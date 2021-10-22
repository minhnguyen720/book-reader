CREATE TABLE book (
    BookID    	INT auto_increment,
    BookName    VARCHAR(50),

    PRIMARY KEY(BookID)
);

CREATE TABLE chapter (
    ChapterID    	int auto_increment,
    BookID    		int,
    ChapterName 	VARCHAR(50),
    ChapterContent 	LONGTEXT,

    PRIMARY KEY (ChapterID),
    FOREIGN KEY (BookID) REFERENCES book(BookID)
);