"use strict";

$(document).ready(function () {
  $('#header').load('includes/header.html');
});
var urlParams = new URLSearchParams(window.location.search);
var id = parseInt(urlParams.get('id'));
var specificPost = document.querySelector('#specificPost');
var comment = document.querySelector('#comment');
var commentBtn = document.querySelector("#commentBtn");
document.addEventListener('DOMContentLoaded', function () {
  checkPostId();
  loadSpecificPost();
});
commentBtn.addEventListener("click", addComment);

function checkPostId() {
  if (id) {
    return;
  } else {
    window.location.href = "home.html";
  }
}

function generateStar(id, rating) {
  $(function () {
    $("#post-rate".concat(id)).rateYo({
      rating: rating,
      starWidth: "20px",
      ratedFill: "#07a8e2",
      halfStar: true,
      readOnly: true
    });
  });
}

function loadSpecificPost() {
  var post, book, user, commentData, commentCount, comments, strPost, htmlPost;
  return regeneratorRuntime.async(function loadSpecificPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.posts.where({
            postId: id
          }).first());

        case 2:
          post = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(db.books.where("bookId").equals(parseInt(post.bookId)).first());

        case 5:
          book = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(db.users.where("userId").equals(post.userId).first());

        case 8:
          user = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(db.comments.where("postId").equals(post.postId));

        case 11:
          commentData = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(commentData.count());

        case 14:
          commentCount = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(commentData.toArray());

        case 17:
          comments = _context.sent;

          if (post.picture == "") {
            strPost = "\n    <div class=\"card card-body mb-4 p-0\">\n    <div class=\"row p-3\">\n        <div class=\"col-2\">\n            <a href=\"profile.html\"><img src=\"".concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                    height=\"70\">\n            </a>\n        </div>\n        <div class=\"col-10 p-2\">\n            <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, "</h5>\n            <small class=\"text-muted p-0\">").concat(post.createdAt, "</small>\n        </div>\n    </div>\n    <div class=\"px-3 py-1\">\n        <h4 class=\"font-weight-light text-muted title\">").concat(book.title, "</h4>\n    </div>\n    <div class=\"px-3 text-justify w-100\">\n        <p class=\"text-muted\">\n            ").concat(post.post, "    \n        </p>\n    </div>\n\n    <div class=\"rating-comment px-4 pb-3\">\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                <div id=\"post-rate").concat(post.postId, "\">").concat(post.rating, "</div>\n            </div>\n            <div class=\"col-md-4\">\n                <a href=\"post.html\" class=\" text-primary  float-right\"><i class=\"fa fa-comment\"></i>\n                    ").concat(commentCount, " Comments</a>\n            </div>\n        </div>\n    </div>\n</div>\n");
          } else {
            strPost = "\n    <div class=\"card card-body mb-4 p-0\">\n    <div class=\"row p-3\">\n        <div class=\"col-2\">\n            <a href=\"profile.html?id=".concat(user.userId, "\"><img src=\"").concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                    height=\"70\">\n            </a>\n        </div>\n        <div class=\"col-10 p-2\">\n            <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, " <small class=\"text-muted\"><i class=\"fa fa-angle-right\"></i> ").concat(post.postType == "recommendation" ? "Recommended" : "Reviewed", " ").concat(book.title, " By <b>").concat(book.author, "</b></small></h5>\n            <small class=\"text-muted p-0\">").concat(post.createdAt, "</small>\n        </div>\n    </div>\n\n    <div class=\"post-image\">\n        <a href=\"post.html?id=").concat(post.postId, "\"><img src=\"").concat(post.picture, "\" width=\"100%\"></a>\n    </div>\n    <div class=\"px-3 border-left border-bottom border-right text-justify w-100\">\n        <p class=\"text-muted border-left border-right border-bottom p-3\">\n            ").concat(post.post, "   \n        </p>\n    </div>\n\n    <div class=\"rating-comment px-4 py-2 pb-3\">\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                <div id=\"post-rate").concat(post.postId, "\">").concat(post.rating, "</div>\n            </div>\n            <div class=\"col-md-4\">\n                <a href=\"post.html\" class=\" text-primary  float-right\"><i class=\"fa fa-comment\"></i>\n                    ").concat(commentCount, " Comments</a>\n            </div>\n        </div>\n    </div>\n</div>\n");
          }

          htmlPost = new DOMParser().parseFromString(strPost, 'text/html');
          specificPost.appendChild(htmlPost.body.firstChild);
          generateStar(post.postId, post.rating); // comments.forEach(comment => {
          // });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addComment() {
  var commentMessage, alert, newComment;
  return regeneratorRuntime.async(function addComment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          commentMessage = document.querySelector('#commentMessage');

          if (!(comment.value === "")) {
            _context2.next = 9;
            break;
          }

          commentMessage.innerHTML = "";
          alert = document.createElement("div");
          alert.className = "alert alert-danger";
          alert.textContent = "please fill the required form";
          commentMessage.appendChild(alert);
          _context2.next = 12;
          break;

        case 9:
          newComment = {
            userId: loggedInUser(),
            postId: id,
            comment: comment.value,
            createdAt: new Date(),
            updatedAt: ""
          };
          _context2.next = 12;
          return regeneratorRuntime.awrap(db.comments.add(newComment).then(function (result) {
            commentMessage.innerHTML = "";
            var alert = document.createElement("div");
            alert.className = "alert alert-success";
            alert.textContent = "commented";
            commentMessage.appendChild(alert);
          })["catch"](function (error) {
            commentMessage.innerHTML = "";
            var alert = document.createElement("div");
            alert.className = "alert alert-danger";
            alert.textContent = error;
            commentMessage.appendChild(alert);
          }));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}