"use strict";

var editor;
ClassicEditor.create(document.querySelector('#postArea')).then(function (newEditor) {
  editor = newEditor;
})["catch"](function (error) {
  console.error(error);
});
var postForm = document.querySelector("#postFor");
var selectBooks = document.querySelector("#selectBooks");
var postType = document.querySelector('#type');
var post = document.querySelector("#postArea");
var postMessage = document.querySelector("#postMessage");
var feeds = document.querySelector("#feeds");
document.addEventListener('DOMContentLoaded', function () {
  loadMyBooks();
  loadPosts();
});

function loadMyBooks() {
  var mybooks;
  return regeneratorRuntime.async(function loadMyBooks$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.books.where("userId").equals(loggedInUser()).toArray());

        case 2:
          mybooks = _context.sent;
          mybooks.forEach(function (book) {
            var option = document.createElement("option");
            option.setAttribute("value", book.bookId);
            option.textContent = book.title;
            selectBooks.appendChild(option);
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

$(function () {
  var $rateYo = $("#rateYo").rateYo({
    starWidth: "30px",
    ratedFill: "#07a8e2",
    halfStar: true
  });
  $("#post-rate1").rateYo({
    rating: 4,
    starWidth: "20px",
    ratedFill: "#07a8e2",
    halfStar: true,
    readOnly: true
  });
  $("#post-rate2").rateYo({
    rating: 4,
    starWidth: "20px",
    ratedFill: "#07a8e2",
    halfStar: true,
    readOnly: true
  });
  $("#postBtn").click(function () {
    var rating = $rateYo.rateYo("rating");

    if (editor.getData() == "" || rating == 0 || postType == "") {
      postMessage.classList.add("alert-danger");
      postMessage.textContent = "Please fill the required input";
      postMessage.style.display = "block";
    } else {
      var newPost = {
        bookId: parseInt(selectBooks.value),
        userId: loggedInUser(),
        postType: postType.value,
        //rec, rev
        rating: rating,
        post: editor.getData(),
        picture: "https://images.unsplash.com/photo-1549122728-f519709caa9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80",
        createdAt: new Date(),
        updatedAt: ""
      };
      db.posts.add(newPost).then(function () {
        // postMessage.classList.remove("alert-danger")
        postMessage.classList.add("alert-success");
        postMessage.textContent = "Posted";
        postMessage.style.display = "block"; //clear post form

        postType.value = null;
        $rateYo.rateYo("rating", 0);
        editor.setData(" ");
        loadPosts();
      })["catch"](function (error) {
        postMessage.classList.add("alert-danger");
        postMessage.textContent = "Error ".concat(error);
        postMessage.style.display = "block";
      });
    }
  });
});

function loadPosts() {
  var posts;
  return regeneratorRuntime.async(function loadPosts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.table("posts").orderBy("postId").reverse().toArray());

        case 2:
          posts = _context3.sent;
          posts.forEach(function _callee(post) {
            var book, user, comments, postNoHtmlTag, strPost, htmlPost;
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(db.books.where("bookId").equals(parseInt(post.bookId)).first());

                  case 2:
                    book = _context2.sent;
                    _context2.next = 5;
                    return regeneratorRuntime.awrap(db.users.where("userId").equals(post.userId).first());

                  case 5:
                    user = _context2.sent;
                    _context2.next = 8;
                    return regeneratorRuntime.awrap(db.comments.where("postId").equals(post.postId).count());

                  case 8:
                    comments = _context2.sent;
                    postNoHtmlTag = post.post.replace(/(<([^>]+)>)/gi, "");

                    if (post.picture == "") {
                      strPost = "\n            <div class=\"card card-body mb-4 p-0\">\n            <div class=\"row p-3\">\n                <div class=\"col-2\">\n                    <a href=\"profile.html\"><img src=\"".concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                            height=\"70\">\n                    </a>\n                </div>\n                <div class=\"col-10 p-2\">\n                    <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, "</h5>\n                    <small class=\"text-muted p-0\">").concat(post.createdAt, "</small>\n                </div>\n            </div>\n            <div class=\"px-3 py-1\">\n                <h4 class=\"font-weight-light text-muted title\">").concat(book.title, "</h4>\n            </div>\n            <div class=\"px-3 text-justify w-100\">\n                <p class=\"text-muted\">\n                    ").concat(postNoHtmlTag.length > 100 ? postNoHtmlTag.substring(0, 100) : postNoHtmlTag, "    \n                </p>\n            </div>\n    \n            <div class=\"rating-comment px-4 pb-3\">\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <div id=\"post-rate").concat(post.postId, "\">").concat(post.rating, "</div>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <a href=\"post.html\" class=\" text-primary  float-right\"><i class=\"fa fa-comment\"></i>\n                            ").concat(comments, " Comments</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ");
                    } else {
                      strPost = "\n            <div class=\"card card-body mb-4 p-0\">\n            <div class=\"row p-3\">\n                <div class=\"col-2\">\n                    <a href=\"profile.html?id=".concat(user.userId, "\"><img src=\"").concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                            height=\"70\">\n                    </a>\n                </div>\n                <div class=\"col-10 p-2\">\n                    <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, "</h5>\n                    <small class=\"text-muted p-0\">").concat(post.createdAt, "</small>\n                </div>\n            </div>\n            <div class=\"px-3 py-1\">\n                <h4 class=\"font-weight-light text-muted title\">").concat(book.title, "</h4>\n            </div>\n\n            <div class=\"post-image\">\n                <a href=\"post.html?id=").concat(post.postId, "\"><img src=\"").concat(post.picture, "\" width=\"100%\"></a>\n            </div>\n            <div class=\"px-3 text-justify w-100\">\n                <p class=\"text-muted\">\n                    ").concat(postNoHtmlTag.length > 100 ? postNoHtmlTag.substring(0, 100) : postNoHtmlTag, "    \n                </p>\n            </div>\n    \n            <div class=\"rating-comment px-4 pb-3\">\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <div id=\"post-rate").concat(post.postId, "\">").concat(post.rating, "</div>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <a href=\"post.html\" class=\" text-primary  float-right\"><i class=\"fa fa-comment\"></i>\n                            ").concat(comments, " Comments</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ");
                    }

                    htmlPost = new DOMParser().parseFromString(strPost, 'text/html');
                    feeds.appendChild(htmlPost.body.firstChild);

                  case 13:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

$(document).ready(function () {
  $('#header').load('includes/header.html');
  $('#books').select2();
});