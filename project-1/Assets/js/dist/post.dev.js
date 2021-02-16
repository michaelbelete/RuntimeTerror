"use strict";

$(document).ready(function () {
  $('#header').load('includes/header.html');
});
var urlParams = new URLSearchParams(window.location.search);
var id = parseInt(urlParams.get('id'));
document.addEventListener('DOMContentLoaded', function () {
  checkPostId();
  loadSpecificPost();
});

function checkPostId() {
  if (id) {
    return;
  } else {
    window.location.href = "home.html";
  }
}

function loadSpecificPost() {
  var post, book, user, commentData, commentCount, comments;
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

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
}