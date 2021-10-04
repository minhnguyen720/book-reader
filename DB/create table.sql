CREATE TABLE book (
	BookID				VARCHAR(6),
    BookName			VARCHAR(50),
    
    PRIMARY KEY(BookID)
);

CREATE TABLE chapter (
	ChapterID	VARCHAR(6),
    BookID		VARCHAR(6),
    ChapterName	VARCHAR(50),
    Content		MEDIUMTEXT,
    
    PRIMARY KEY (ChapterID, BookID),
    foreign key (BookID) references book(BookID)
)

INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('1', 'The Chicken Soul');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('2', 'The Duck Soul');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('3', 'The Dog Soul');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('4', 'The Cat Soul');
INSERT INTO `project`.`book` (`BookID`, `BookName`) VALUES ('5', 'The Bird Soul');

INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('1', '1', 'Introduction', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('2', '1', 'Zwei', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('3', '1', 'Drei', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('4', '1', 'Fear', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('5', '1', 'Fume', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('1', '2', 'Introduction', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('2', '2', 'Zwei', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('3', '2', 'Drei', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('1', '3', 'Introduction', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('2', '3', 'Zwei', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('3', '3', 'Drei', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('4', '3', 'Fear', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('1', '4', 'Introduction', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('1', '5', 'Introduction', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('2', '5', 'Zwei', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('3', '5', 'Drei', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
INSERT INTO `project`.`chapter` (`ChapterID`, `BookID`, `ChapterName`, `Content`) VALUES ('4', '5', 'Fear', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');