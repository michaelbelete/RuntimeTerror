// need to change the active status of nav to mybooks
$(document).ready(function () {
    $('#header').load('includes/header.html')
    $('#books').select2();
});
// book add form ... pending

const addBook = document.querySelector('#addBook')

const searchFilter = document.querySelector('.search-filter');

const titleInput = document.querySelector('.title');
const editionInput = document.querySelector('.edition');
const authorInput = document.querySelector('.author');
const publisherInput = document.querySelector('.publisher');
const shortDescInput = document.querySelector('.short-desc');

const bookList = document.querySelector('.book-list');

// const removeBooks = document.querySelector('.remove-all') //possible under the more options (three dots)
// const removeBook = document.querySelector('.remove-book'); //without delegation


// Event Listeners
addBook.addEventListener('submit', addNewBook);
// // removeBooks.addEventListener('click', removeAllBooks);
// removeBook.addEventListener('click', removeBookF);
bookList.addEventListener('click', removeBookF);
searchFilter.addEventListener('keyup', filterBooks);
bookList.addEventListener('click', displayMoreInfo);



const db = new Dexie('Bookacholics');

db.version(3).stores({
    users: "++useId, firstName, lastName, email, &username, bio, hobbies, birthDate, currentCity, homeTown, education, registeredAt",
    books: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, userId",
    wishlist: "++bookId, title, author, edition, publisher, dateAdded, whyWish, userId",
    posts: "++postId, bookId, postType, rating, comments, createdAt, updatedAt, userId",
    comments: "++commentId, comment, userId, createdAt, updatedAt"
});

db.open().then(displayMyBooks());

const newUser = {
    firstName: "michael",
    lastName: "belete",
    email: "it.michael.belete@gmail.com",
    username: "@abc",
    bio: "some bio...",
    hobbies: "programming",
    birthDate: Date(),
    currentCity: "Addis Ababa",
    homeTown: "Bahir Dar",
    education: "BSC",
    registeredAt: Date(),
}

db.users.put(newUser).then(function() {
    console.log("user created succesfully")
}).catch((error) => console.log(error))











// --------------
// let DB;
let userID = sessionStorage.getItem('userId');

// // If we added sorting
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
//     let objectStore = db.createObjectStore('mybooks', {
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





function addNewBook(e) {
    e.preventDefault();

    // if (!titleInput.value || !authorInput.value || !editionInput.value) {
    //     alert("nah"); //will change it
    //     return;
    // }

    console.log("here");
    let newBook = {
        title: titleInput.value,
        author: authorInput.value,
        edition: editionInput.value,
        publisher: publisherInput.value,
        dateAdded: new Date(),
        shortDesc: shortDescInput.value,
        // userId: userID
        userId: 1
    }

    db.books.put(newBook).then(function() {
        console.log("book created succesfully")
        addBook.reset();
        displayMyBooks();
    }).catch((error) => console.log(error))
    

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
              <select name="" id="" class="form-control">
                <option value="">Private</option>
                <option value="">Public</option>
              </select>
            </div>
            <div class="col-lg-3">
              <h4 class="px-2 pt-2">
                <a href="modifyBook.html?id=${book.bookId}"><i class="fas fa-edit text-secondary"></i></a>
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


        bookList.prepend(div); //may wanna prepend
        // console.log("not");
    })
    // .then(console.log("HERE"))
    // .catch(console.log("there"))
    // // console.log(bookList.firstElementChild);
    // if (!bookList.firstElementChild) {
    //     let d = document.createElement('div');
    //     let p = document.createElement('p');
    //     p.textContent = "Seems like you have not added any books in your read-book list. Click the Add New Book button above to start adding.";
    //     p.className = "text-center";
    //     d.appendChild(p);
    //     bookList.appendChild(d);
    // }
}




function removeAllBooks() {
    db.books.clear()
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
            console.log(bookID)
            e.target.parentElement.parentElement.parentElement.remove();
            
            
        }
    }
}






function filterBooks() {
    var noResult = true;
    var noMatch = document.querySelector(".no-match");

    // if (!bookList.firstChild.className.includes('book')){
    //     bookList.firstChild.textContent += "\n You can't search an empty book list.";
    //     return;
    // }

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

let isInvisbile = true;
function displayMoreInfo(e){
    // console.log(isInvisbile);
    if (e.target.classList.contains('more-info')) {
        // console.log(isInvisbile);
        let moreInfoDiv = e.target.parentElement.parentElement.nextElementSibling;
        if (moreInfoDiv.style.display == "flex") moreInfoDiv.setAttribute("style", `display: none !important`);
        else moreInfoDiv.setAttribute("style", `display: flex !important`);
        // console.log(isInvisbile);
        // if(isInvisbile) isInvisbile = false;
        // else isInvisbile = true;
        // console.log(isInvisbile);
    }
}