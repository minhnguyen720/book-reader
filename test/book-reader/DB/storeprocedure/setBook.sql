CREATE DEFINER=`root`@`localhost` PROCEDURE `setBook`(BookName VARCHAR(50))
BEGIN
	DECLARE BookID VARCHAR(6);
    DECLARE flag INT;
    DECLARE code INT;
    DECLARE book_name_temp VARCHAR(50);
    
    SET flag=0;
    SET code = (SELECT COUNT(B.BookID) from book B);
    SET book_name_temp=BookName;
    
    SET BookID= CAST((code+1)as char(6));
    
	IF replace(book_name_temp,' ','') !=''
	THEN IF BookName NOT IN (SELECT B.BookName FROM book B) 
    THEN IF BookID NOT IN (SELECT B.BookID FROM book B) 
		THEN INSERT INTO book VALUES (BookID, BookName);
        SET flag=1;
		END IF;
	END IF;
    END IF;
    SELECT flag;
END