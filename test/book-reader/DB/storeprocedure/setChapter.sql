CREATE DEFINER=`root`@`localhost` PROCEDURE `setChapter`(BookName VARCHAR(50), ChapterName VARCHAR(50))
BEGIN
	DECLARE ChapterID VARCHAR(6);
    DECLARE ChapterPosition VARCHAR(100);
    DECLARE flag INT;
    DECLARE code INT;
    DECLARE book_name_temp VARCHAR(50);
    DECLARE chapter_name_temp VARCHAR(50);
	DECLARE chapterlocation VARCHAR(100);

    SET book_name_temp=BookName;
	SET chapter_name_temp=ChapterName;
    SET ChapterPosition = concat('C:Users/PC/Downloads/Compressed/', REPLACE(book_name_temp,' ',''),"_",REPLACE(chapter_name_temp,' ',''),'.html');
    SET chapterlocation = ChapterPosition;
    SET flag=0;
    SET code = (SELECT COUNT(C.ChapterID) 
				from chapter C 
                    WHERE C.BookID=(SELECT B.BookID FROM book B WHERE B.BookName=BookName));
    SET ChapterID= CAST((code+1)as char(6));
    
    IF replace(book_name_temp,' ','') !='' AND replace(chapter_name_temp,' ','') !=''
	THEN IF BookName IN (SELECT B.BookName FROM book B) 
		THEN INSERT INTO chapter VALUES (ChapterID,(SELECT B.BookID FROM book B WHERE B.BookName=BookName),ChapterName,ChapterPosition);
        SET flag=1;
		END IF;
	END IF;
    SELECT flag, chapterlocation;
END