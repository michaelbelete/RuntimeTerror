"use strict";

$(document).ready(function () {
  $('#header').load('includes/header.html');
  $('#starRating').rateYo({
    rating: 4.5,
    starWidth: "35px",
    ratedFill: "#07a8e2",
    halfStar: true,
    readOnly: true
  });
});
var urlParams = new URLSearchParams(window.location.search);
var id = parseInt(urlParams.get('id'));
var specificPost = document.querySelector('#specificPost');
var specificComment = document.querySelector('#specificComments');
var comment = document.querySelector('#comment');
var commentBtn = document.querySelector("#commentBtn");
var loader = document.querySelector('#specificPostLoader'); //book rating vars

var bookRating = document.querySelector('#bookRating');
var recentReviews = document.querySelector('#recentReviews');
document.addEventListener('DOMContentLoaded', function () {
  checkPostId();
  loadSpecificPost().then(function _callee() {
    var post, book, countFromMyBook, countFromWish, addToWishList, wishListData;
    return regeneratorRuntime.async(function _callee$(_context) {
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
            return regeneratorRuntime.awrap(db.books.where({
              bookId: post.bookId
            }).first());

          case 5:
            book = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(db.books.where("title").equals(book.title).count());

          case 8:
            countFromMyBook = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(db.wishlist.where("title").equals(book.title).count());

          case 11:
            countFromWish = _context.sent;
            addToWishList = document.querySelector("#addToWishList");
            wishListData = document.querySelector("#wishListData");

            if (countFromMyBook !== 0) {
              addToWishList.textContent = "Already Read";
              addToWishList.setAttribute("disabled", "disabled");
            } else {
              if (countFromWish) {
                addToWishList.textContent = "Added";
                addToWishList.setAttribute("disabled", "disabled");
              }
            }

            addToWishList.addEventListener("click", function () {
              var newWish = {
                title: book.title,
                author: book.author,
                edition: book.edition,
                publisher: book.publisher,
                dateAdded: new Date(),
                whyWish: book.whyWish,
                userId: loggedInUser()
              };
              db.wishlist.put(newWish).then(function () {
                addToWishList.textContent = "Added";
                addToWishList.setAttribute("disabled", "disabled");
              })["catch"](function (error) {
                return console.log(error);
              });
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});

function checkPostId() {
  if (id || id === undefined || id === null) {
    var post = db.posts.where;
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

function loadReviews(title, postId) {
  var resultPost, reviewPost, book, reviewTitle;
  return regeneratorRuntime.async(function loadReviews$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          resultPost = [];
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.posts.where("postId").equals(postId).toArray());

        case 3:
          reviewPost = _context2.sent;
          reviewPost.forEach(function (result) {
            resultPost.push(result);
          });
          _context2.next = 7;
          return regeneratorRuntime.awrap(db.books.where('title').equalsIgnoreCase(title).first());

        case 7:
          book = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(db.posts.where("bookId").equals(book.bookId).toArray());

        case 10:
          reviewTitle = _context2.sent;
          reviewTitle.forEach(function (result) {
            resultPost.push(result);
          });
          resultPost = resultPost.reverse(function (a, b) {
            return a - b;
          });
          resultPost = resultPost.filter(function (post, index, self) {
            return index === self.findIndex(function (t) {
              return post.userId === post.userId && post.postId === post.postId;
            });
          });

          if (!(resultPost.length >= 5)) {
            _context2.next = 18;
            break;
          }

          return _context2.abrupt("return", resultPost.slice(0, 5));

        case 18:
          return _context2.abrupt("return", resultPost);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function averageRatingOfBook(bookID) {
  var bookPosts, avgRating, sum, numberOfBookPosts;
  return regeneratorRuntime.async(function averageRatingOfBook$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.posts.where("bookId").equals(bookID).toArray());

        case 2:
          bookPosts = _context3.sent;
          avgRating = 0;
          sum = 0;
          numberOfBookPosts = bookPosts.length;

          if (!numberOfBookPosts) {
            _context3.next = 10;
            break;
          }

          bookPosts.forEach(function (bookPost) {
            sum += bookPost.rating;
          });
          avgRating = sum / numberOfBookPosts;
          return _context3.abrupt("return", {
            rating: avgRating,
            rateNumber: numberOfBookPosts
          });

        case 10:
          return _context3.abrupt("return", -1);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function loadSpecificPost() {
  var post, book, user, commentData, commentCount, comments, strPost, avgRating, strBookRating, htmlPost;
  return regeneratorRuntime.async(function loadSpecificPost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          loader.style.display = "block";
          _context6.next = 3;
          return regeneratorRuntime.awrap(db.posts.where({
            postId: id
          }).first());

        case 3:
          post = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(db.books.where("bookId").equals(parseInt(post.bookId)).first());

        case 6:
          book = _context6.sent;
          _context6.next = 9;
          return regeneratorRuntime.awrap(db.users.where("userId").equals(parseInt(post.userId)).first());

        case 9:
          user = _context6.sent;
          _context6.next = 12;
          return regeneratorRuntime.awrap(db.comments.where("postId").equals(post.postId));

        case 12:
          commentData = _context6.sent;
          _context6.next = 15;
          return regeneratorRuntime.awrap(commentData.count());

        case 15:
          commentCount = _context6.sent;
          _context6.next = 18;
          return regeneratorRuntime.awrap(commentData.toArray());

        case 18:
          comments = _context6.sent;
          loadReviews(book.title, post.postId).then(function (result) {
            console.log(result);
            var reviews = result.filter(function (posts) {
              return posts.postType === 'review';
            });
            console.log(reviews);
            reviews.forEach(function _callee2(review) {
              var usr, strReview, htmlReview;
              return regeneratorRuntime.async(function _callee2$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return regeneratorRuntime.awrap(db.users.where("userId").equals(parseInt(review.userId)).first());

                    case 2:
                      usr = _context4.sent;
                      strReview = "\n                <div class=\"row pl-2 border-bottom py-2\">\n                    <div class=\"col-sm-3\">\n                        <a href=\"profile.html?id=".concat(usr.userId, "\"><img src=\"").concat(usr.profilePicture, "\" alt=\"profile\" class=\"rounded-circle ml-3\"\n                                width=\"70\" height=\"70\">\n                        </a>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        <h5 class=\"text-primary pt-1 m-0\">").concat(usr.firstName, " ").concat(usr.lastName, "</h5>\n                        <small class=\"text-muted\">").concat(review.post.replace(/(<([^>]+)>)/gi, ""), "</small>\n                    </div>\n            </div>\n            ");
                      htmlReview = new DOMParser().parseFromString(strReview, 'text/html');
                      recentReviews.appendChild(htmlReview.body.firstChild);

                    case 6:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            });
          });

          if (post.picture == "") {
            strPost = "\n    <div class=\"card card-body mb-4 p-0\">\n    <div class=\"row p-3\">\n        <div class=\"col-2\">\n            <a href=\"profile.html\"><img src=\"".concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                    height=\"70\">\n            </a>\n        </div>\n        <div class=\"col-10 p-2\">\n            <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, "</h5>\n            <small class=\"text-muted p-0\">").concat(post.createdAt, "</small>\n        </div>\n    </div>\n    <div class=\"px-3 py-1\">\n        <h4 class=\"font-weight-light text-muted title\">").concat(book.title, "</h4>\n    </div>\n    <div class=\"px-3 text-justify w-100\">\n        <p class=\"text-muted\">\n            ").concat(post.post, "    \n        </p>\n    </div>\n\n    <div class=\"rating-comment px-4 pb-3\">\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                <div id=\"post-rate").concat(post.postId, "\">").concat(post.rating, "</div>\n            </div>\n            <div class=\"col-md-4\">\n                <a href=\"post.html\" class=\" text-primary  float-right\"><i class=\"fa fa-comment\"></i>\n                    ").concat(commentCount, " Comments</a>\n            </div>\n        </div>\n    </div>\n</div>\n");
          } else {
            strPost = "\n    <div class=\"card card-body mb-4 p-0\">\n    <div class=\"row p-3\">\n        <div class=\"col-2\">\n            <a href=\"profile.html?id=".concat(user.userId, "\"><img src=\"").concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                    height=\"70\">\n            </a>\n        </div>\n        <div class=\"col-10 p-2\">\n            <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, " <small class=\"text-muted\"><i class=\"fa fa-angle-right\"></i> ").concat(post.postType == "recommendation" ? "Recommended" : "Reviewed", " ").concat(book.title, " By <b>").concat(book.author, "</b></small></h5>\n            <small class=\"text-muted p-0\">").concat(post.createdAt, "</small>\n        </div>\n    </div>\n\n    <div class=\"post-image\">\n        <a href=\"post.html?id=").concat(post.postId, "\"><img src=\"").concat(post.picture, "\" width=\"100%\"></a>\n    </div>\n    <div class=\"px-3 border-left border-bottom border-right text-justify w-100\">\n        <p class=\"text-muted border-left border-right border-bottom p-3\">\n            ").concat(post.post, "   \n        </p>\n    </div>\n\n    <div class=\"rating-comment px-4 py-2 pb-3\">\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                <div id=\"post-rate").concat(post.postId, "\">").concat(post.rating, "</div>\n            </div>\n            <div class=\"col-md-4\">\n                <a href=\"post.html\" class=\" text-primary  float-right\"><i class=\"fa fa-comment\"></i>\n                    ").concat(commentCount, " Comments</a>\n            </div>\n        </div>\n    </div>\n</div>\n");
          }

          specificPost.innerHTML = "";
          specificComment.innerHTML = "";
          bookRating.innerHTML = "";
          _context6.next = 26;
          return regeneratorRuntime.awrap(averageRatingOfBook(book.bookId).then(function (avgBook) {
            return avgBook;
          }));

        case 26:
          avgRating = _context6.sent;
          strBookRating = "\n    <div class=\"col-md-5 pl-3 pt-2 pr-4 text-center\">\n    <img src=\"".concat(post.picture, "\" width=\"100%\" height=\"120px\">\n    <h2 class=\"display-4 pt-2 font-weight-bold text-warning\">").concat(avgRating.rating, "</h2>\n    <p class=\"mb-1\">Average Rating</p>\n    <small class=\"text-muted\">").concat(avgRating.rateNumber, " Total Ratings</small>\n</div>\n<div class=\"col-md-6 pl-0 pt-3\">\n    <h4 class=\"pl-3 font-weight-bold\">").concat(book.title, "</h4>\n    <p class=\"font-weight-lighter text-muted pt-2 pl-3 mb-1\">Author: ").concat(book.author, "</p>\n    <small class=\"font-weight-lighter text-muted pl-3 p-0\">Publisher: ").concat(book.publisher, "</small>\n    <div id=\"starRating\" class=\"pt-3 pb-2\"></div>\n    <button class=\"btn btn-outline-primary btn-sm p-2 mt-2 ml-2\" id=\"addToWishList\">Add to wishlist</button>\n    </div>\n    ");
          htmlPost = new DOMParser().parseFromString(strPost, 'text/html');
          specificPost.appendChild(htmlPost.body.firstChild);
          generateStar(post.postId, post.rating);
          bookRating.innerHTML = strBookRating;
          $(function () {
            $("#starRating").rateYo({
              rating: avgRating.rating,
              starWidth: "30px",
              ratedFill: "#ffaf01",
              halfStar: true,
              readOnly: true
            });
          });
          comments.forEach(function _callee3(comment) {
            var user, strComment, htmlPost;
            return regeneratorRuntime.async(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(db.users.where("userId").equals(parseInt(comment.userId)).first());

                  case 2:
                    user = _context5.sent;
                    strComment = "\n            <div class=\"row px-4 pb-2\" id=\"comments\">\n            <div class=\"col-sm-1 p-4\">\n                <a href=\"profile.html?id=".concat(comment.userId, "\"><img src=\"").concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                        height=\"70\">\n                </a>\n            </div>\n            <div class=\"col-sm-10 p-4 ml-3\">\n                <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, " <span class=\"text-muted\" style=\"font-size: 14px;\"><i class=\"fa fa-angle-right\"></i> ").concat(comment.createdAt, "</span></h5>\n                <small class=\"text-muted\">").concat(comment.comment, "</small>\n            </div>\n        </div>\n        ");
                    htmlPost = new DOMParser().parseFromString(strComment, 'text/html');
                    specificComment.appendChild(htmlPost.body.firstChild);

                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });
          loader.style.display = "none";

        case 35:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function addComment() {
  var commentMessage, alert, newComment;
  return regeneratorRuntime.async(function addComment$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          commentMessage = document.querySelector('#commentMessage');

          if (!(comment.value === "")) {
            _context7.next = 9;
            break;
          }

          commentMessage.innerHTML = "";
          alert = document.createElement("div");
          alert.className = "alert alert-danger";
          alert.textContent = "please fill the required form";
          commentMessage.appendChild(alert);
          _context7.next = 13;
          break;

        case 9:
          newComment = {
            userId: loggedInUser(),
            postId: id,
            comment: comment.value,
            createdAt: new Date(),
            updatedAt: ""
          };
          _context7.next = 12;
          return regeneratorRuntime.awrap(db.comments.add(newComment).then(function (result) {
            commentMessage.innerHTML = "";
            var alert = document.createElement("div");
            alert.className = "alert alert-success";
            alert.textContent = "commented";
            commentMessage.appendChild(alert);
            comment.value = '';
          })["catch"](function (error) {
            commentMessage.innerHTML = "";
            var alert = document.createElement("div");
            alert.className = "alert alert-danger";
            alert.textContent = error;
            commentMessage.appendChild(alert);
          }));

        case 12:
          loadSpecificPost();

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  });
}