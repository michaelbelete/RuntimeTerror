// need to change the active status of nav to mybooks
$(document).ready(function() {
    $('#header').load('includes/header.html')
        // $('#books').select2();
});

const searchFilter = document.querySelector('.search-filter');

const bookList = document.querySelector('.book-list');

// add book form
const titleInput = document.querySelector('.title');
const editionInput = document.querySelector('.edition');
const authorInput = document.querySelector('.author');
const publisherInput = document.querySelector('.publisher');
const shortDescInput = document.querySelector('.short-desc');

const addBook = document.querySelector('#addBook');

// modify book form
const titleMInput = document.querySelector('.titleM');
const editionMInput = document.querySelector('.editionM');
const authorMInput = document.querySelector('.authorM');
const publisherMInput = document.querySelector('.publisherM');
const shortDescMInput = document.querySelector('.short-descM');

const modifyBook = document.querySelector('#modifyBook');

// select /privacy status
// const select = document.querySelector('select');

// const removeBooks = document.querySelector('.remove-all') //possible under the more options (three dots)
// const removeBook = document.querySelector('.remove-book'); //without delegation


// Event Listeners
// addBook.addEventListener('submit', addNewBook);
addBook.addEventListener('submit', bookValidate);
modifyBook.addEventListener('submit', bookValidate);
// // removeBooks.addEventListener('click', removeAllBooks);
// removeBook.addEventListener('click', removeBookF);
bookList.addEventListener('click', removeBookF);
searchFilter.addEventListener('keyup', filterBooks);
bookList.addEventListener('click', displayMoreInfo);
bookList.addEventListener('click', fillInForm);

displayMyBooks();

let userID = sessionStorage.getItem('userId');


let modifyBkId;

function bookValidate(e) {
    e.preventDefault();
    let isNotRead = true;
    if (e.target.id == "addBook") {
        db.books.each(book => {
            // await db.books.each( book => {
            if ((titleInput.value == book.title) && (authorInput.value == book.author) && (editionInput.value == book.edition)) {
                alert("You've already added the book."); //will change it
                isNotRead = false;
                return;
            }
        }).then(
            db.wishlist.toArray(books => {
                console.log(books);
                books.forEach(book => {
                    if ((titleInput.value == book.title) && (authorInput.value == book.author) && (editionInput.value == book.edition)) {
                        alert("You finally read it! The book will be removed from your wishlist.");
                        console.log(book.bookId);
                        db.wishlist.delete(book.bookId);
                    }
                })
            }).then(() => {
                if (!isNotRead) {
                    return;
                }

                addNewBook();
            })
        )

    } else {

        db.wishlist.toArray(books => {
            // await db.books.each( book => {
            console.log(books);
            books.forEach(book => {
                if ((titleMInput.value == book.title) && (authorMInput.value == book.author) && (editionMInput.value == book.edition)) {
                    // alert("You've already added the book."); //will change it
                    // isNotRead = false;
                    // return;
                    alert("You finally read it! The book will to be removed from your wishlist.");
                    console.log(book.bookId);
                    db.wishlist.delete(book.bookId);
                }
            })
        }).then(
            db.books.each(book => {
                // await db.books.each( book => {
                console.log(modifyBkId, book.bookId)
                if ((titleMInput.value == book.title) && (authorMInput.value == book.author) && (editionMInput.value == book.edition) && (book.bookId != modifyBkId)) {
                    alert("You've already added the book. You can delete this book by clicking the red bin icon."); //will change it
                    isNotRead = false;
                    return;
                }
            }).then(
                () => {
                    if (isNotRead) {
                        modifyBookF(modifyBkId);
                    }

                }
            )
        )
    }

}


let addMessage = document.querySelector("#addMessage");
let editMessage = document.querySelector("#editMessage");

function addNewBook() {

    let newBook = {
        title: titleInput.value,
        author: authorInput.value,
        edition: editionInput.value,
        publisher: publisherInput.value,
        dateAdded: new Date(),
        shortDesc: shortDescInput.value,
        // userId: userID
        userId: loggedInUser()
    }

    db.books.put(newBook).then(function() {
        console.log("book created succesfully")
        addBook.reset();
        displayMyBooks();
        addMessage.setAttribute("style", "display: block !important");
        setTimeout(() => {
            addMessage.setAttribute("style", "display: none !important");
            document.querySelector("#postmodal span").click()
        }, 1500)

    }).catch((error) => console.log(error))


}

function modifyBookF(id) {
    console.log('inside modifyBookF()');
    let bookID = id;
    db.books.update(bookID, {
        title: titleMInput.value,
        author: authorMInput.value,
        edition: editionMInput.value,
        publisher: publisherMInput.value,
        // dateAdded: new Date(),
        shortDesc: shortDescMInput.value,
        // userId: userID
        userId: loggedInUser()
    }).then(x => {
        if (x) {
            // console.log(x);
            console.log('updated successfully');
            displayMyBooks();
            editMessage.setAttribute("style", "display: block !important");
            setTimeout(() => {
                editMessage.setAttribute("style", "display: none !important");
                document.querySelector("#postmodalModify span").click()
            }, 1500)
        } else console.log("modification failed: either key doesn't exist or no modification made.");
    })

}


function displayMyBooks() {
    while (bookList.firstElementChild) {
        bookList.removeChild(bookList.firstElementChild);
    }


    db.books.each(book => {
        let div = document.createElement('div');
        div.className = "row py-2 px-4 w-100 book";
        div.setAttribute('my-book-id', book.bookId); // will be useful for deleting [through .delete()]

        div.innerHTML = `<div class="col-lg-7 d-flex">
              <div class="col-1 p-0 mr-3">
                <i class="fa fa-book fa-3x text-secondary"></i>
              </div>
              <div class="col-10 p">
                <h6 class="py-0"><b class="text-primary">${book.title} </b><i class="fa fa-caret-right"
                    aria-hidden="true"></i><span> ${book.author}</span></h6>
                <p class="text-muted py-0">${book.edition}, ${book.publisher}</p>
              </div>
            </div>
            <div class="col-lg-2">
              <select name="" id="" class="form-control privacyStatus">
                <option value="0" ${!Boolean(book.isPublic)? "selected":""}>Private</option>
                <option value="1" ${Boolean(book.isPublic)? "selected":""}>Public</option>
              </select>
            </div>
            <div class="col-lg-3">
              <h4 class="px-2 pt-2">
              <i class="fas fa-edit text-secondary edit" data-toggle="modal"
              data-target="#postModalModify"></i>
                <i class="fas fa-trash text-danger remove-book"></i>
                <i class="fas fa-ellipsis-h bg-dark border rounded-pill text-white more-info"></i>
              </h4>
            </div>
            <div class="d-none">
                <div class="col-lg-7 d-flex">
                    <div class="col-1 invisible mr-3">Hey</div>
                    <div class="col-10">
                        <p>
                            ${book.shortDesc}
                        </p>
                    </div>
                    
                </div>
                <div class="col-lg-5 text-secondary">
                    ${book.dateAdded.getDate()}/
                    ${book.dateAdded.getMonth()}/
                    ${book.dateAdded.getFullYear()}
                </div>
                
            </div>`

        // <select name="" id="" class="form-control" onchange="updatebookPrivacyStatus()">


        bookList.prepend(div); //may wanna prepend
        // console.log("not");
    }).then(() => {
        if (!bookList.firstElementChild) {
            let d = document.createElement('div');
            let p = document.createElement('p');
            p.textContent = "Seems like you have not added any books in your wishlist. Click the Add New Book button above to start adding.";
            p.className = "text-center h5";
            d.appendChild(p);
            bookList.appendChild(d);
        }
        document.querySelector('.spinner-border').parentElement.setAttribute("style", "display: none !important");
    })

}




function removeAllBooks() {
    db.books.clear();
    displayMyBooks();
}








// if we delegated the event from the ul //will need the immediate parent of the fa-remove i to have .remove-book class
// bookList.addEventListener('click', removeBookF);
function removeBookF(e) {
    // console.log('here');
    if (e.target.classList.contains('remove-book')) {
        if (confirm('Are You Sure about that ?')) {
            let bookID = Number(e.target.parentElement.parentElement.parentElement.getAttribute('my-book-id'));
            db.books.delete(bookID);
            // console.log(bookID)
            e.target.parentElement.parentElement.parentElement.remove();
            displayMyBooks();


        }
    }
}






function filterBooks() {
    var noResult = true;
    var noMatch = document.querySelector(".no-match");

    document.querySelectorAll('.book').forEach(el => {
        if (el.textContent.toLocaleLowerCase().includes(searchFilter.value.toLocaleLowerCase())) { //will need improvement (to only check text that is relevant)
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


}

// let isInvisbile = true;
function displayMoreInfo(e) {
    // console.log(isInvisbile);
    if (e.target.classList.contains('more-info')) {
        // console.log(isInvisbile);
        let moreInfoDiv = e.target.parentElement.parentElement.nextElementSibling;
        if (moreInfoDiv.style.display == "flex") {
            moreInfoDiv.setAttribute("style", `display: none !important`);
            moreInfoDiv.parentElement.style.backgroundColor = "initial";
            // moreInfoDiv.style.backgroundColor = "initial";
        } else {
            moreInfoDiv.setAttribute("style", `display: flex !important`);
            moreInfoDiv.parentElement.style.backgroundColor = "#f2f2f2";
            // moreInfoDiv.style.backgroundColor = "#f2f2f2";
        }
    }
}

async function fillInForm(e) {
    // async function fillInForm(){
    // console.log('here');
    if (e.target.classList.contains('edit')) {
        modifyBkId = Number(e.target.parentElement.parentElement.parentElement.getAttribute('my-book-id'));
        let bk = await db.books.where('bookId').equals(modifyBkId).toArray();
        bk = bk[0];
        // let bk = await db.wishlist.where('bookId').equals(bookID).toArray()[0];
        titleMInput.value = bk.title;
        authorMInput.value = bk.author;
        editionMInput.value = bk.edition;
        publisherMInput.value = bk.publisher;
        shortDescMInput.value = bk.shortDesc;
    }
}


function getId(e) {
    let sel = e.target;
    // console.log("getID", e.target)
    if (sel.classList.contains('privacyStatus')) {
        updatebookPrivacyStatus(Number(sel.parentElement.parentElement.getAttribute('my-book-id')), Boolean(parseInt(sel.value)));

        return;
    }
}


// function updatebookPrivacyStatus(){
// function updatebookPrivacyStatus(privacyBookId){
function updatebookPrivacyStatus(bookID, val) {
    // console.log(e.target);
    // db.books.update(privacyBookId,{
    db.books.update(bookID, {
        // isPublic: Boolean(targ.value)
        isPublic: val
    }).then(x => {
        if (x) {
            // console.log(x);
            console.log('privacy status updated successfully');
        } else console.log("modification failed: either key doesn't exist or no modification made.");
    })
}


bookList.addEventListener('change', updateBookPrivacyStatus);

function updateBookPrivacyStatus(e) {
    if (e.target.classList.contains('privacyStatus')) {
        db.books.update(Number(e.target.parentElement.parentElement.getAttribute('my-book-id')), {
            // isPublic: Boolean(targ.value)
            isPublic: Boolean(parseInt(e.target.value))
        }).then(x => {
            if (x) {
                // console.log(x);
                console.log('privacy status updated successfully');
            } else console.log("modification failed: either key doesn't exist or no modification made.");
        })
    }
}