CREATE TABLE book (
	BookID				VARCHAR(6),
    BookName			VARCHAR(50),
    
    PRIMARY KEY(BookID)
);

CREATE TABLE chapter (
	ChapterID			VARCHAR(6),
    BookID				VARCHAR(6),
    ChapterName			VARCHAR(50),
    ChapterPosition		VARCHAR(100),
    
    primary KEY (ChapterID, BookID),
    foreign key (BookID) references book(BookID)
)

INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('1', 'The Chicken Soul');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('2', 'The Duck Soul');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('3', 'The Dog Soul');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('4', 'The Cat Soul');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('5', 'The Bird Soul');

INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('1', '1', 'Introduction', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('2', '1', 'Zwei', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('3', '1', 'Drei', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('4', '1', 'Fear', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('5', '1', 'Fume', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('1', '2', 'Introduction', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('2', '2', 'Zwei', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('3', '2', 'Drei', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('1', '3', 'Introduction', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('2', '3', 'Zwei', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('3', '3', 'Drei', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('4', '3', 'Fear', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('1', '4', 'Introduction', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('1', '5', 'Introduction', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('2', '5', 'Zwei', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('3', '5', 'Drei', 'C:UsersPCDownloadsCompressed');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `ChapterPosition`) VALUES ('4', '5', 'Fear', 'C:UsersPCDownloadsCompressed');