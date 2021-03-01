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
var pictureUrl = document.querySelector('#picture');
var feeds = document.querySelector("#feeds");
var postLoader = document.querySelector("#postLoader");
var noPost = document.querySelector("#noPost");
document.addEventListener('DOMContentLoaded', function () {
  loadMyBooks();
  loadPosts();
  loadRecentBooks();
  loadPopularMembers();
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

$(function () {
  var $rateYo = $("#rateYo").rateYo({
    starWidth: "30px",
    ratedFill: "#07a8e2",
    halfStar: true
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
        picture: pictureUrl.value,
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
  var postCount, posts;
  return regeneratorRuntime.async(function loadPosts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //clearing the data before staring
          feeds.innerHTML = "";
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.posts.count());

        case 3:
          postCount = _context3.sent;
          console.log(postCount);

          if (!(postCount == 0)) {
            _context3.next = 9;
            break;
          }

          noPost.style.display = "block";
          _context3.next = 13;
          break;

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(db.table("posts").orderBy("postId").reverse().toArray());

        case 11:
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
                    console.log(user);
                    postNoHtmlTag = post.post.replace(/(<([^>]+)>)/gi, "");

                    if (post.picture == "") {
                      strPost = "\n            <div class=\"card card-body mb-4 p-0\">\n            <div class=\"row p-3\">\n                <div class=\"col-2\">\n                    <a href=\"profile.html\"><img src=\"".concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                            height=\"70\">\n                    </a>\n                </div>\n                <div class=\"col-10 p-2\">\n                    <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, "</h5>\n                    <small class=\"text-muted p-0\">").concat(post.createdAt, "</small>\n                </div>\n            </div>\n            <div class=\"px-3 py-1\">\n                <h4 class=\"font-weight-light text-muted title\">").concat(book.title, "</h4>\n            </div>\n            <div class=\"px-3 text-justify w-100\">\n                <p class=\"text-muted\">\n                    ").concat(postNoHtmlTag.length > 100 ? postNoHtmlTag.substring(0, 100) : postNoHtmlTag, "    \n                </p>\n            </div>\n    \n            <div class=\"rating-comment px-4 pb-3\">\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <div id=\"post-rate").concat(post.postId, "\">").concat(post.rating, "</div>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <a href=\"post.html?id=").concat(post.postId, "\" class=\" text-primary  float-right\"><i class=\"fa fa-comment\"></i>\n                            ").concat(comments, " Comments</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ");
                    } else {
                      strPost = "\n            <div class=\"card card-body mb-4 p-0\">\n            <div class=\"row p-3\">\n                <div class=\"col-2\">\n                    <a href=\"profile.html?id=".concat(user.userId, "\"><img src=\"").concat(user.profilePicture, "\" alt=\"profile\" class=\"rounded-circle\" width=\"70\"\n                            height=\"70\">\n                    </a>\n                </div>\n                <div class=\"col-10 p-2\">\n                    <h5 class=\"text-primary pt-1 m-0\">").concat(user.firstName, " ").concat(user.lastName, " <small class=\"text-muted\"><i class=\"fa fa-angle-right\"></i> ").concat(post.postType == "recommendation" ? "Recommended" : "Reviewed", " ").concat(book.title, " By <b>").concat(book.author, "</b></small></h5>\n                    <small class=\"text-muted p-0\">").concat(post.createdAt, "</small>\n                </div>\n            </div>\n\n            <div class=\"post-image\">\n                <a href=\"post.html?id=").concat(post.postId, "\"><img src=\"").concat(post.picture, "\" width=\"100%\"></a>\n            </div>\n            <div class=\"px-3 border-left border-bottom border-right text-justify w-100\">\n                <p class=\"text-muted border-left border-right border-bottom p-3\">\n                    ").concat(postNoHtmlTag.length > 100 ? postNoHtmlTag.substring(0, 100) : postNoHtmlTag, "   \n                    <a href=\"post.html?id=").concat(post.postId, "\">...Read More</a>  \n                </p>\n            </div>\n    \n            <div class=\"rating-comment px-4 py-2 pb-3\">\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <div id=\"post-rate").concat(post.postId, "\">").concat(post.rating, "</div>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <a href=\"post.html?id=").concat(post.postId, "\" class=\" text-primary  float-right\"><i class=\"fa fa-comment\"></i>\n                            ").concat(comments, " Comments</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ");
                    }

                    htmlPost = new DOMParser().parseFromString(strPost, 'text/html');
                    postLoader.style.display = "none";
                    console.log(postLoader);
                    feeds.appendChild(htmlPost.body.firstChild);
                    generateStar(post.postId, post.rating);

                  case 17:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function loadRecentBooks() {
  var bookList, books;
  return regeneratorRuntime.async(function loadRecentBooks$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          bookList = document.querySelector('section > div > div:last-child > div');
          _context4.next = 3;
          return regeneratorRuntime.awrap(db.books.orderBy('bookId').reverse().limit(5).toArray());

        case 3:
          books = _context4.sent;
          books.forEach(function (book) {
            var div = document.createElement('div');
            div.className = "row mb-4";
            div.innerHTML += "<div class=\"col-3 px-2\">\n            <img src=\"https://img.icons8.com/cute-clipart/64/000000/book.png\" height=\"55\" />\n        </div>\n        <div class=\"col-8\">\n            <p class=\"title font-wight-bold p-0 m-0\">".concat(book.title, "</p>\n            <small class=\"text-muted\">").concat(book.author, "</small>\n        </div>");
            bookList.insertBefore(div, bookList.lastElementChild);
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function loadPopularMembers() {
  var totalPostNumberList, posts, users, firstUserIdDistanceFromZero, sortedTotalPostNumberList, popularUsersNumberOfPosts, popularUsersId, i, j, _i, popularUser, popularUsersList, div;

  return regeneratorRuntime.async(function loadPopularMembers$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          //finding id's of the five most popular users - users with most posts
          totalPostNumberList = []; //total number of posts for each user - the index of the array corresponds to the id of the user

          _context5.next = 3;
          return regeneratorRuntime.awrap(db.posts.toArray());

        case 3:
          posts = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(db.users.toArray());

        case 6:
          users = _context5.sent;
          firstUserIdDistanceFromZero = users[0].userId; //gap between 0 and first user id //so as not to have an array with many empties when the gap is big

          users.forEach(function (user) {
            posts.forEach(function (post) {
              if (post.userId == user.userId) totalPostNumberList[user.userId - firstUserIdDistanceFromZero] ? totalPostNumberList[user.userId - firstUserIdDistanceFromZero] += 1 : totalPostNumberList[user.userId - firstUserIdDistanceFromZero] = 1;
            });
          });
          sortedTotalPostNumberList = totalPostNumberList;
          sortedTotalPostNumberList.sort();
          popularUsersNumberOfPosts = sortedTotalPostNumberList.length >= 5 ? sortedTotalPostNumberList.splice(sortedTotalPostNumberList.length - 5, 5) : sortedTotalPostNumberList; // let popularUsersId = totalPostNumberList.length >= 5? range(totalPostNumberList.length-4, totalPostNumberList.length+1) : range(1, totalPostNumberList.length+1)

          popularUsersId = [];
          i = 0;

        case 14:
          if (!(i < popularUsersNumberOfPosts.length)) {
            _context5.next = 26;
            break;
          }

          j = 0;

        case 16:
          if (!(j < totalPostNumberList.length)) {
            _context5.next = 23;
            break;
          }

          if (!(popularUsersNumberOfPosts[i] == totalPostNumberList[j])) {
            _context5.next = 20;
            break;
          }

          popularUsersId[i] = j + firstUserIdDistanceFromZero;
          return _context5.abrupt("break", 23);

        case 20:
          j++;
          _context5.next = 16;
          break;

        case 23:
          i++;
          _context5.next = 14;
          break;

        case 26:
          _i = popularUsersId.length - 1;

        case 27:
          if (!(_i >= 0)) {
            _context5.next = 39;
            break;
          }

          _context5.next = 30;
          return regeneratorRuntime.awrap(db.users.where("userId").equals(popularUsersId[_i]).toArray());

        case 30:
          popularUser = _context5.sent;
          popularUsersList = document.querySelector("section > div > div:nth-child(2) > div");
          div = document.createElement('div');
          div.className = "row mb-4";
          div.innerHTML += "<div class=\"col-3 px-3\">\n            <img src=\"".concat(popularUser[_i].profilePicture, "\" class=\"rounded-circle\" height=\"60\" />\n        </div>\n        <div class=\"col-8 pt-2\">\n            <p class=\"title font-wight-bold p-0 m-0\">").concat(popularUser[_i].firstName, " ").concat(popularUser[_i].lastName, "</p>\n            <small class=\"text-muted\">").concat(popularUser[_i].username, "</small>\n        </div>");
          popularUsersList.appendChild(div);

        case 36:
          _i--;
          _context5.next = 27;
          break;

        case 39:
        case "end":
          return _context5.stop();
      }
    }
  });
} // function range(begin,end){
//     let arr = [];
//     for (let i = begin; i < end; i++) arr.push(i);
//     return arr;
// }
// possibly temporary
// for header
// search


$(document).ready(function () {
  $('#header').load('includes/header.html');
  $('#books').select2();
});
var search = document.querySelector("#search");
search.addEventListener('keyup', filter);

function filter() {
  var noResult = true; // var noMatch = document.createElement('p');
  // clearing sides

  if (search.value) {
    document.querySelector('section > div > div:nth-child(2) > div:last-child > div').setAttribute("style", "display: none !important");
    document.querySelector('section > div > div:last-child > div:last-child > div').setAttribute("style", "display: none !important");
    document.querySelector('section > div > div:first-child > div > p').innerHTML = "Search Results";
    document.querySelector('section > div > div:first-child > div > p:last-child').innerHTML = "&nbsp";
  } else {
    document.querySelector('section > div > div:nth-child(2) > div:last-child > div').setAttribute("style", "display: flex !important");
    document.querySelector('section > div > div:last-child > div:last-child > div').setAttribute("style", "display: flex !important");
    document.querySelector('section > div > div:first-child > div > p').innerHTML = "Feeds";
    document.querySelector('section > div > div:first-child > div > p:last-child').innerHTML = "Check what others user have been up to!";
  } // filter


  var feeds = document.querySelectorAll('section > div > div:nth-child(3) > div:last-child > div');
  feeds.forEach(function (postDiv) {
    if (postDiv.textContent.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
      postDiv.style.display = "flex";
      noResult = false;
      return;
    }

    postDiv.setAttribute("style", "display: none !important");
  }); // no match message

  if (noResult) {
    document.querySelector('section > div > div:first-child > div > p:last-child').innerHTML = "Oops. No match was found. Try changing your search phrase."; // noMath.className = "text-center h5";
    // noMatch.textContent = "Oops. No match was found. Try changing your search phrase.";
    // feeds.appendChild(noMatch);
    // noMatch.setAttribute("style", "display: block !important");
  } else {
    document.querySelector('section > div > div:first-child > div > p:last-child').innerHTML = "&nbsp"; // document.querySelector('section').appendChild(noMatch);
    // noMatch.style.display = null;
  }
}