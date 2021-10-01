CREATE DEFINER=`root`@`localhost` PROCEDURE `setBook`(BookName VARCHAR(50))
BEGIN
	DECLARE BookID VARCHAR(6);
    DECLARE flag INT;
    SET flag=0;
    SET BookID = concat('B',floor(rand()*100000));
    WHILE BookID IN (SELECT B.BookID FROM book B)
		DO
			SET BookID = concat('B',floor(rand()*100000));
		END WHILE;
	IF BookName NOT IN (SELECT B.BookName FROM book B) 
    THEN IF BookID NOT IN (SELECT B.BookID FROM book B) 
		THEN INSERT INTO book VALUES (BookID, BookName);
        SET flag=1;
		END IF;
	END IF;
    SELECT flag;
END