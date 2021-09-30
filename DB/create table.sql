CREATE TABLE book (
	BookID	VARCHAR(6),
    BookName	VARCHAR(50),
    
    PRIMARY KEY(BookID)
);

CREATE TABLE chapter (
	ChapterID	VARCHAR(6),
    BookID	VARCHAR(6),
    ChapterName VARCHAR(50),
    ChapterPosition VARCHAR(150),
    
    PRIMARY KEY (ChapterID),
    FOREIGN KEY (BookID) REFERENCES book(BookID)
);

INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('B00001', 'Book1');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('B00002', 'Book2');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('B00003', 'Book3');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('B00004', 'Book4');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('B00005', 'Book5');

INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C10001', 'B00001', 'Chap 1', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C10002', 'B00001', 'Chap 2', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C10003', 'B00001', 'Chap 3', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C10004', 'B00001', 'Chap 4', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C10005', 'B00001', 'Chap 5', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C20001', 'B00002', 'Chap 1', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C20002', 'B00002', 'Chap 2', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C20003', 'B00002', 'Chap 3', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C30001', 'B00003', 'Chap 1', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C30002', 'B00003', 'Chap 2', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C30003', 'B00003', 'Chap 3', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C30004', 'B00003', 'Chap 4', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C40001', 'B00004', 'Chap 1', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C50001', 'B00005', 'Chap 1', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C50002', 'B00005', 'Chap 2', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C50003', 'B00005', 'Chap 3', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('C50004', 'B00005', 'Chap 4', 'C:UsersPCDownloadsCompressed');