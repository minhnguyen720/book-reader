CREATE DEFINER=`root`@`localhost` PROCEDURE `getBook`(book_name VARCHAR(50))
BEGIN
	set book_name = concat(book_name,'%'); 
    if book_name is NULL then 
		set book_name = '%';
	end if;
    
    SELECT BookName
    FROM book
    WHERE BookName LIKE book_name;
END