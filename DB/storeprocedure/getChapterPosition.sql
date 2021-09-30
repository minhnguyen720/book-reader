CREATE DEFINER=`root`@`localhost` PROCEDURE `getChapterPosition`(chapter_id VARCHAR(6))
BEGIN
    SELECT ChapterPosition
    FROM chapter
    WHERE ChapterID LIKE chapter_id;
END