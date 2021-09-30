CREATE DEFINER=`root`@`localhost` PROCEDURE `getChapter`(book_name VARCHAR(50))
BEGIN    
    SELECT ChapterID, ChapterName
    FROM book
		NATURAL JOIN chapter
    WHERE BookName LIKE book_name;
END