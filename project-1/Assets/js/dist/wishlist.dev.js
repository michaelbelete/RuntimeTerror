"use strict";

// need to change the active status of nav to Wishlist
$(document).ready(function () {
  $('#header').load('includes/header.html'); // $('#books').select2();
});
var searchFilter = document.querySelector('.search-filter');
var bookList = document.querySelector('.book-list'); // add book form

var titleInput = document.querySelector('.title');
var editionInput = document.querySelector('.edition');
var authorInput = document.querySelector('.author');
var publisherInput = document.querySelector('.publisher');
var whyWishInput = document.querySelector('.why-wish');
var addBook = document.querySelector('#addBook'); // modify book form

var titleMInput = document.querySelector('.titleM');
var editionMInput = document.querySelector('.editionM');
var authorMInput = document.querySelector('.authorM');
var publisherMInput = document.querySelector('.publisherM');
var whyWishMInput = document.querySelector('.why-wishM');
var modifyBook = document.querySelector('#modifyBook'); // const removeBooks = document.querySelector('.remove-all') //possible under the more options (three dots)
// const removeBook = document.querySelector('.remove-book'); //without delegation
// Event Listeners
// addBook.addEventListener('submit', addNewBook);

addBook.addEventListener('submit', wishListValidate);
modifyBook.addEventListener('submit', wishListValidate); // addBook.addEventListener('submit', awt);
// // removeBooks.addEventListener('click', removeAllBooks);
// removeBook.addEventListener('click', removeBookF);

bookList.addEventListener('click', removeBookF);
searchFilter.addEventListener('keyup', filterBooks);
bookList.addEventListener('click', displayMoreInfo);
bookList.addEventListener('click', fillInForm); // bookList.addEventListener('click', getId);
// const db = new Dexie('Bookacholics');
// db.version(3).stores({
//     users: "++useId, firstName, lastName, email, &username, bio, hobbies, birthDate, currentCity, homeTown, education, registeredAt",
//     books: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, userId",
//     wishlist: "++bookId, title, author, edition, publisher, dateAdded, whyWish, userId",
//     posts: "++postId, bookId, postType, rating, comments, createdAt, updatedAt, userId",
//     comments: "++commentId, comment, userId, createdAt, updatedAt"
// });
// db.open().then(displayMyBooks());

displayMyBooks(); // const newUser = {
//     firstName: "michael",
//     lastName: "belete",
//     email: "it.michael.belete@gmail.com",
//     username: "@abc",
//     bio: "some bio...",
//     hobbies: "programming",
//     birthDate: Date(),
//     currentCity: "Addis Ababa",
//     homeTown: "Bahir Dar",
//     education: "BSC",
//     registeredAt: Date(),
// }
// db.users.put(newUser).then(function() {
//     console.log("user created succesfully")
// }).catch((error) => console.log(error))
// --------------
// let DB;

var userID = sessionStorage.getItem('userId'); // // If we added sorting
// // var isAlphaBeticalAsc = true;
// // var isDateAsc = true;
// let myBookDB = indexedDB.open('Bookaholics', 2);
// myBookDB.onerror = function () {
//     console.log('There was an error');
// }
// myBookDB.onsuccess = function () {
//     // console.log('Database Ready');
//     DB = myBookDB.result;
//     displayMyBooks();
// }
// myBookDB.onupgradeneeded = function (e) {
//     let db = e.target.result;
//     let objectStore = db.createObjectStore('myWishlist', {
//         keyPath: 'bookid',
//         autoIncrement: true
//     });
//     objectStore.createIndex('userId', 'userId', {
//         unique: false
//     });
//     objectStore.createIndex('bookTitle', 'bookTitle', {
//         unique: false
//     });
//     objectStore.createIndex('edition', 'edition', {
//         unique: false
//     }); //might need us to add it in the My Books page
//     // objectStore.createIndex('publicationDate', 'publicationDate', { unique: false }); //
//     objectStore.createIndex('author', 'author', {
//         unique: false
//     });
//     objectStore.createIndex('publisher', 'publisher', {
//         unique: false
//     });
//     objectStore.createIndex('dateAdded', 'dateAdded', {
//         unique: true
//     });
//     objectStore.createIndex('shortDesc', 'shortDesc', {
//         unique: false
//     });
//     console.log('Database created.');
// }
// async function awt(){
//     let isNotRead = await wishListValidate();
//     if (!isNotRead){
//         return;
//     }
//     let y = await addNewBook();
// }

var modifyBkId;

function wishListValidate(e) {
  // async function wishListValidate(e){
  e.preventDefault(); // console.log(typeof(e.target.id));

  var isNotRead = true; // console.log('outside', e.target.id);

  if (e.target.id == "addBook") {
    // console.log('if',e.target.id);
    db.books.each(function (book) {
      // await db.books.each( book => {
      if (titleInput.value == book.title && authorInput.value == book.author && editionInput.value == book.edition) {
        alert("Can't wish for a book you've already read (added to the book read page). Sorry."); //will change it

        isNotRead = false;
        return;
      }
    }).then(db.wishlist.each(function (book) {
      // await db.books.each( book => {
      if (titleInput.value == book.title && authorInput.value == book.author && editionInput.value == book.edition) {
        alert("You've already wishlisted the book."); //will change it

        isNotRead = false;
        return;
      }
    }).then(function () {
      // console.log(x);
      if (!isNotRead) {
        // addNewBook()
        return; // return false;
      } // return true;
      // if(e.target.id = "addBook") addNewBook();
      // else modifyBookF();


      addNewBook();
    }));
  } else {
    // console.log('else', e.target.id);
    db.books.each(function (book) {
      // await db.books.each( book => {
      if (titleMInput.value == book.title && authorMInput.value == book.author && editionMInput.value == book.edition) {
        alert("Can't wish for a book you've already read (added to the book read page). Sorry. You can delete this wishlist by clicking the red bin icon."); //will change it

        isNotRead = false;
        return;
      }
    }).then(db.wishlist.each(function (book) {
      // await db.books.each( book => {
      if (titleMInput.value == book.title && authorMInput.value == book.author && editionMInput.value == book.edition) {
        alert("You've already wishlisted the book. You can delete this wishlist by clicking the red bin icon."); //will change it

        isNotRead = false;
        return;
      }
    }).then(function () {
      // console.log(x);
      if (!isNotRead) {
        // addNewBook()
        return; // return false;
      } // return true;
      // if(e.target.id = "addBook") addNewBook();
      // else modifyBookF();


      modifyBookF(modifyBkId);
    }));
  }
} // comparison function
// )
// function addNewBook(e) {


function addNewBook() {
  // e.preventDefault();
  // let isNotRead = true;
  // if (!titleInput.value || !authorInput.value || !editionInput.value) {
  //     alert("nah"); //will change it
  //     return;
  // }
  // db.books.each( book => {
  //     if (    (titleInput.value == book.title )  &&   (authorInput.value == book.author)  && (  editionInput.value == book.edition)   ){
  //         alert("Can't wish for a book you already read (added to the book read page). Sorry."); //will change it
  //         isNotRead = false;
  //     }
  // }
  // )
  // console.log("==============", checkOnBooks);
  // if (!isNotRead) return;
  // if (titleInput.value && authorInput.value && editionInput.value){
  //     alert("nah"); //will change it
  //     return;
  // }
  // console.log("here");
  var newBook = {
    title: titleInput.value,
    author: authorInput.value,
    edition: editionInput.value,
    publisher: publisherInput.value,
    dateAdded: new Date(),
    whyWish: whyWishInput.value,
    // userId: userID
    userId: 1
  };
  db.wishlist.put(newBook).then(function () {
    console.log("book created successfully");
    addBook.reset();
    displayMyBooks();
  })["catch"](function (error) {
    return console.log(error);
  });
}

function modifyBookF(id) {
  console.log('inside modifyBookF()');
  var bookID = id;
  db.wishlist.update(bookID, {
    title: titleMInput.value,
    author: authorMInput.value,
    edition: editionMInput.value,
    publisher: publisherMInput.value,
    // dateAdded: new Date(),
    whyWish: whyWishMInput.value,
    // userId: userID
    userId: 1
  }).then(function (x) {
    if (x) {
      // console.log(x);
      console.log('updated successfully');
      displayMyBooks();
    } else console.log("modification failed: either key doesn't exist or no modification made.");
  });
}

function displayMyBooks() {
  while (bookList.firstElementChild) {
    bookList.removeChild(bookList.firstElementChild);
  }

  db.wishlist.each(function (book) {
    var div = document.createElement('div');
    div.className = "row py-2 px-4 w-100 book";
    div.setAttribute('my-book-id', book.bookId); // will be useful for deleting [through .delete()]

    div.innerHTML = "<div class=\"col-lg-7 d-flex\">\n              <div class=\"col-1 p-0 mr-3\">\n                <i class=\"fa fa-book fa-3x text-secondary\"></i>\n              </div>\n              <div class=\"col-10 p\">\n                <h6 class=\"py-0\"><b class=\"text-primary\">".concat(book.title, " </b><i class=\"fa fa-caret-right\"\n                    aria-hidden=\"true\"></i><span> ").concat(book.author, "</span></h6>\n                <p class=\"text-muted py-0\">").concat(book.edition, ", ").concat(book.publisher, "</p>\n              </div>\n            </div>\n            <div class=\"col-lg-2\">\n              <select name=\"\" id=\"\" class=\"form-control privacyStatus\">\n                <option value=\"0\" ").concat(!Boolean(book.isPublic) ? "selected" : "", ">Private</option>\n                <option value=\"1\" ").concat(Boolean(book.isPublic) ? "selected" : "", ">Public</option>\n              </select>\n            </div>\n            <div class=\"col-lg-3\">\n              <h4 class=\"px-2 pt-2\">\n                <i class=\"fas fa-edit text-secondary edit\" data-toggle=\"modal\"\n                data-target=\"#postModalModify\"></i>\n                <i class=\"fas fa-trash text-danger remove-book\"></i>\n                <i class=\"fas fa-ellipsis-h bg-dark border rounded-pill text-white more-info\"></i>\n              </h4>\n            </div>\n            <div class=\"d-none\">\n                <div class=\"col-lg-7 d-flex\">\n                    <div class=\"col-1 invisible mr-3\">Hey</div>\n                    <div class=\"col-10\">\n                        <p>\n                            ").concat(book.whyWish, "\n                        </p>\n                    </div>\n                    \n                </div>\n                <div class=\"col-lg-5 text-secondary\">\n                    ").concat(book.dateAdded.getDate(), "/\n                    ").concat(book.dateAdded.getMonth(), "/\n                    ").concat(book.dateAdded.getFullYear(), "\n                </div>\n                \n            </div>"); // <a href="modifyBook.html?id=${book.bookId}"><i class="fas fa-edit text-secondary"></i></a>

    bookList.prepend(div); //may wanna prepend
    // console.log("not");
  }).then(function () {
    if (!bookList.firstElementChild) {
      var d = document.createElement('div');
      var p = document.createElement('p');
      p.textContent = "Seems like you have not added any books in your wishlist. Click the Add New Book button above to start adding.";
      p.className = "text-center h5";
      d.appendChild(p);
      bookList.appendChild(d);
    }
  }); // .then(console.log("HERE"))
  // .catch(console.log("there"))
  // // console.log(bookList.firstElementChild);
  // if (!bookList.firstElementChild) {
  //     let d = document.createElement('div');
  //     let p = document.createElement('p');
  //     p.textContent = "Seems like you have not added any books in your wishlist. Click the Add New Book button above to start adding.";
  //     p.className = "text-center";
  //     d.appendChild(p);
  //     bookList.appendChild(d);
  // }
} // will need to be used or removed


function removeAllBooks() {
  db.wishlist.clear();
  displayMyBooks();
} // // function removeBookF(e) {
// //     console.log('here')
// //     if (e.target.classList.contains('remove-book')) {
// //         if (confirm('Are You Sure about that ?')) {
// //             let bookID = Number(e.target.parentElement.parentElement.parentElement.getAttribute('my-book-id'));
// //             let transaction = DB.transaction('myWishlist', 'readwrite');
// //             let objectStore = transaction.objectStore('myWishlist');
// //             objectStore.delete(bookID);
// //             console.log(bookID)
// //             transaction.oncomplete = () => {
// //                 e.target.parentElement.parentElement.parentElement.remove();
// //             }
// //         }
// //     }
// // }
// if we delegated the event from the ul //will need the immediate parent of the fa-remove i to have .remove-book class
// bookList.addEventListener('click', removeBookF);


function removeBookF(e) {
  // console.log('here');
  if (e.target.classList.contains('remove-book')) {
    if (confirm('Are You Sure about that ?')) {
      var bookID = Number(e.target.parentElement.parentElement.parentElement.getAttribute('my-book-id'));
      db.wishlist["delete"](bookID); // console.log(bookID)

      e.target.parentElement.parentElement.parentElement.remove();
      displayMyBooks();
    }
  }
}

function filterBooks() {
  var noResult = true;
  var noMatch = document.querySelector(".no-match"); // if (!bookList.firstChild.className.includes('book')){
  //     bookList.firstChild.textContent += "\n You can't search an empty book list.";
  //     return;
  // }

  document.querySelectorAll('.book').forEach(function (el) {
    if (el.textContent.toLocaleLowerCase().includes(searchFilter.value.toLocaleLowerCase())) {
      //will need improvement (to only check text that is relevant)
      el.style.display = "flex";
      noResult = false;
      return;
    }

    el.setAttribute("style", "display: none !important"); //had to do that to check the filtering on this html-made list
  });

  if (noResult) {
    bookList.appendChild(noMatch);
    noMatch.setAttribute("style", "display: block !important");
  } else {
    document.querySelector('.container').appendChild(noMatch);
    noMatch.style.display = null;
  }
} // let isInvisbile = true;


function displayMoreInfo(e) {
  // console.log(isInvisbile);
  if (e.target.classList.contains('more-info')) {
    // console.log(isInvisbile);
    var moreInfoDiv = e.target.parentElement.parentElement.nextElementSibling;

    if (moreInfoDiv.style.display == "flex") {
      moreInfoDiv.setAttribute("style", "display: none !important");
      moreInfoDiv.parentElement.style.backgroundColor = "initial"; // moreInfoDiv.style.backgroundColor = "initial";
    } else {
      moreInfoDiv.setAttribute("style", "display: flex !important");
      moreInfoDiv.parentElement.style.backgroundColor = "#f2f2f2"; // moreInfoDiv.style.backgroundColor = "#f2f2f2";
    } // console.log(isInvisbile);
    // if(isInvisbile) isInvisbile = false;
    // else isInvisbile = true;
    // console.log(isInvisbile);

  }
}

function fillInForm(e) {
  var bk;
  return regeneratorRuntime.async(function fillInForm$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!e.target.classList.contains('edit')) {
            _context.next = 11;
            break;
          }

          modifyBkId = Number(e.target.parentElement.parentElement.parentElement.getAttribute('my-book-id'));
          _context.next = 4;
          return regeneratorRuntime.awrap(db.wishlist.where('bookId').equals(modifyBkId).toArray());

        case 4:
          bk = _context.sent;
          bk = bk[0]; // let bk = await db.wishlist.where('bookId').equals(bookID).toArray()[0];

          titleMInput.value = bk.title;
          authorMInput.value = bk.author;
          editionMInput.value = bk.edition;
          publisherMInput.value = bk.publisher;
          whyWishMInput.value = bk.whyWish;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
} // let oneZero = 0;
// function getIdEveryTwoClicks(e){
//     console.log("oneZero",oneZero);
//     if (oneZero) getId(e);
//     oneZero = oneZero? 0:1;
//     console.log("Onezero", oneZero);
// }
// let privacyBookId;


function getId(e) {
  var sel = e.target; // console.log("getID", e.target)

  if (sel.classList.contains('privacyStatus')) {
    // if (sel.classList.contains('privacyStatus') && Boolean(parseInt(sel.getAttribute('oneZero'))) ){
    // if (sel.parentElement.classList.contains('privacyStatus')){
    // console.log(sel.value);
    // console.log(sel.parentElement.value);
    updatebookPrivacyStatus(Number(sel.parentElement.parentElement.getAttribute('my-book-id')), Boolean(parseInt(sel.value))); // sel.setAttribute('oneZero','0');

    return;
  } // sel.setAttribute('oneZero','1');
  // updatebookPrivacyStatus(Number(sel.parentElement.parentElement.getAttribute('my-book-id')), sel);
  // updatebookPrivacyStatus(sel.parentElement.parentElement.getAttribute('my-book-id'));
  // console.log("privacyBoodId",privacyBookId);

} // function updatebookPrivacyStatus(){
// function updatebookPrivacyStatus(privacyBookId){


function updatebookPrivacyStatus(bookID, val) {
  // console.log(e.target);
  // db.books.update(privacyBookId,{
  db.wishlist.update(bookID, {
    // isPublic: Boolean(targ.value)
    isPublic: val
  }).then(function (x) {
    if (x) {
      // console.log(x);
      console.log('privacy status updated successfully');
    } else console.log("modification failed: either key doesn't exist or no modification made.");
  });
}

bookList.addEventListener('change', updateBookPrivacyStatus);

function updateBookPrivacyStatus(e) {
  if (e.target.classList.contains('privacyStatus')) {
    db.books.update(Number(e.target.parentElement.parentElement.getAttribute('my-book-id')), {
      // isPublic: Boolean(targ.value)
      isPublic: Boolean(parseInt(e.target.value))
    }).then(function (x) {
      if (x) {
        // console.log(x);
        console.log('privacy status updated successfully');
      } else console.log("modification failed: either key doesn't exist or no modification made.");
    });
  }
}