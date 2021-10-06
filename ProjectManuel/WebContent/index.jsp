<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ page import = "com.ebook.model.Chapter" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/3865c9fb77.js" crossorigin="anonymous"></script>
    <title>Chapters</title>
</head>

<body>
	<form action="<%=request.getContextPath()%>/set-chapter" method="post">
    <div class="chapters" id="app">
        <div class="chapters_sidebar">
            <button class="chapters_add" type="button">Add Chapter</button>
            <div class="chapters_list">
                <div class="chapters_list-item chapters_list-item-selected">
                    <div class="chapters_small-title"></div>
                </div>
            </div>
        </div>
        <div class="chapters_preview">
            <div class="chapters_toolbar">
                <button type="button" id="bold-btn" class="tool-btn">
                    <i class=' fas fa-bold'></i>
                </button>
                <button type="button" id="italic-btn" class="tool-btn">
                    <i class=' fas fa-italic'></i>
                </button>
                <button type="button" id="underline-btn" class="tool-btn">
                    <i class=' fas fa-underline'></i>
                </button>
                <button type="button" class="tool-btn" id="hilite-btn">
                    <i class="fas fa-highlighter"></i>
                </button>
                <input class="tool-btn" id="highlight" type="color">
                <button type="button" class="tool--btn" id="align-left-btn">
                    <i class="fas fa-align-left"></i>
                </button>
                <button type="button" class="tool-btn" id="align-center-btn">
                    <i class="fas fa-align-center"></i>
                </button>
                <button type="button" class="tool-btn" id="align-justify-btn">
                    <i class="fas fa-align-justify"></i>
                </button>
                <button type="button" class="tool-btn" id="align-rite-btn">
                    <i class="fas fa-align-right"></i>
                </button>
                <button type="button" class="tool-btn" id="save-btn">
                    <i class="fas fa-save"></i>
                </button>
                <select class="tool--btn" id="font">
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Helvetica ">Helvetica </option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
                <select class="tool--btn" id="font-size">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
            <div class="chapters_content">
                <input id = "chapterName" type="text" class="chapters_title" placeholder="Enter a title...">
                <div class="chapters_body" id="response" contenteditable="true" spellcheck="false">
                </div>
                
            </div>
        </div> 
    </div>
    <div>
	<input type="submit" value="set chapter">
	</div>
	</form>

    <script src="main.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"
        integrity="sha384-W8fXfP3gkOKtndU4JGtKDvXbO53Wy8SZCQHczT5FMiiqmQfUpWbYdTil/SxwZgAN"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js"
        integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/"
        crossorigin="anonymous"></script>
</body>

</html>