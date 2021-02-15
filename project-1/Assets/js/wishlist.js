// need to change the active status of nav to Wishlist
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
// removeBooks.addEventListener('click', removeAllBooks);
// removeBook.addEventListener('click', removeBookF);
bookList.addEventListener('click', removeBookF);
searchFilter.addEventListener('keyup', filterBooks);


// --------------
let DB;

// const username = localStorage.getItem(username);

// If we added sorting
// var isAlphaBeticalAsc = true;
// var isDateAsc = true;


let myBookDB = indexedDB.open('Bookaholics2', 2);

myBookDB.onerror = function () {
    console.log('There was an error');
}

myBookDB.onsuccess = function () {
    // console.log('Database Ready');
    DB = myBookDB.result;
    displayMyBooks();
}

myBookDB.onupgradeneeded = function (e) {
    let db = e.target.result;
    let objectStore = db.createObjectStore('users', {
        keyPath: 'userid',
        autoIncrement: true
    });
    objectStore.createIndex('firstName', 'firstName', {
        unique: false
    });
    objectStore.createIndex('lastName', 'lastName', {
        unique: false
    }); 
    objectStore.createIndex('email', 'email', {
        unique: false
    });
    objectStore.createIndex('username', 'username', {
        unique: true
    });
    objectStore.createIndex('bio', 'bio', {
        unique: false
    });
    objectStore.createIndex('hobbies', 'hobbies', {
        unique: false
    });
    objectStore.createIndex('birthDate', 'birthDate', {
        unique: false
    });
    objectStore.createIndex('currentCity', 'currentCity', {
        unique: false
    });
    objectStore.createIndex('homeTown', 'homeTown', {
        unique: false
    });
    objectStore.createIndex('education', 'education', {
        unique: false
    });
    objectStore.createIndex('regisetredAt', 'regisetredAt', {
        unique: false
    });
    objectStore.createIndex('books', 'books', {
        unique: false
    });
    objectStore.createIndex('wishList', 'wishList', {
        unique: false
    });
    objectStore.createIndex('posts', 'posts', {
        unique: false
    });
    
    console.log('Database created.');
}





function addNewBook(e) {
    e.preventDefault();

    if (!titleInput.value || !authorInput.value || !editionInput.value) {
        alert("nah"); //will change it
        return;
    }

    console.log("here");
    let newBook = {
        bookId: Symbol('bid'),
        title: titleInput.value,
        author: authorInput.value,
        edition: editionInput.value,
        publisher: publisherInput.value,
        dateAdded: Date(),
        // dateModified:, //books can't really be edited/modified
        shortDesc: shortDescInput.value



        // bookTitle: titleInput.value,
        // edition: editionInput.value,
        // author: authorInput.value,
        // publisher: publisherInput.value,
        // dateAdded: Date(),
        // dateModified: Date()
    }

    // let transaction = DB.transaction(['myWishlist'], 'readwrite');
    // let objectStore = transaction.objectStore('myWishlist');
    
    // console.log(newBook)
    // let request = objectStore.add(newBook);

    let transaction = DB.transaction(['users'], 'readwrite');
    let objectStore = transaction.objectStore('users');
    let request = objectStore.get(userId);

    // may need local storage to store user (id)


    request.onsuccess = () => {
        let user = request.result;
        user.books.push(newBook);
        addBook.reset();
        // will potentially do other things here like closing the pop-up and maybe some animation saying 'congragulations on you read' or sth along that line
    }
    transaction.oncomplete = () => {
        console.log('Book added.');
        displayMyBooks();
    }
    transaction.onerror = () => {
        console.log('There was an error, try again!');
    }

}


function displayMyBooks() {
    while (bookList.firstElementChild) {
        bookList.removeChild(bookList.firstElementChild);
    }
    let transaction = DB.transaction(['users'], 'readwrite');
    let objectStore = transaction.objectStore('users');
    let request = objectStore.get(userId);

    // may need local storage to store user (id)


    request.onsuccess = () => {
        let user = request.result;
        user.books.forEach(book => {
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
                <p class="text-muted py-0">${book.publisher}</p>
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
                <a href=""><i class="fas fa-ellipsis-h bg-dark border rounded-pill text-white"></i></a>
              </h4>
            </div>`


            bookList.prepend(div); //may wanna prepend



        })
        
    }
    // transaction.oncomplete = () => {
    //     console.log('Book added.');
    //     displayMyBooks();
    // }
    transaction.onerror = () => {
        console.log('There was an error, try again!');
    }

    // console.log(bookList.firstElementChild);
    if (!bookList.firstElementChild){
        let d = document.createElement('div');
        let p = document.createElement('p');
        p.textContent = "Seems like you have not added any books in your wishlist. Click the Add New Book button above to start adding.";
        p.className = "text-center";
        d.appendChild(p);
        bookList.appendChild(d);
    }

    // let objectStore = DB.transaction('myWishlist').objectStore('myWishlist');
    // objectStore.openCursor().onsuccess = function (e) {
    //     let cursor = e.target.result;
    //     if (cursor) {
    //         let div = document.createElement('div');
    //         div.className = "row py-2 px-4 w-100 book";
    //         div.setAttribute('my-book-id', cursor.value.id); // will be useful for deleting [through .delete()]

    //         div.innerHTML = `<div class="col-lg-7 d-flex">
    //           <div class="col-1 p-0 mr-3">
    //             <i class="fa fa-book fa-3x text-secondary"></i>
    //           </div>
    //           <div class="col-10 p">
    //             <h6 class="py-0"><b class="text-primary">${cursor.value.bookTitle} </b><i class="fa fa-caret-right"
    //                 aria-hidden="true"></i><span> ${cursor.value.author}</span></h6>
    //             <p class="text-muted py-0">${cursor.value.publisher}</p>
    //           </div>
    //         </div>
    //         <div class="col-lg-2">
    //           <select name="" id="" class="form-control">
    //             <option value="">Private</option>
    //             <option value="">Public</option>
    //           </select>
    //         </div>
    //         <div class="col-lg-3">
    //           <h4 class="px-2 pt-2">
    //             <a href="modifyBook.html?id=${cursor.value.id}"><i class="fas fa-edit text-secondary"></i></a>
    //             <i class="fas fa-trash text-danger remove-book"></i>
    //             <a href=""><i class="fas fa-ellipsis-h bg-dark border rounded-pill text-white"></i></a>
    //           </h4>
    //         </div>`


    //         bookList.prepend(div); //may wanna prepend

    //         cursor.continue();
    //     }
    //     // console.log(bookList.firstElementChild);
    //     if (!bookList.firstElementChild){
    //         let d = document.createElement('div');
    //         let p = document.createElement('p');
    //         p.textContent = "Seems like you have not added any books in your wishlist. Click the Add New Book button above to start adding.";
    //         p.className = "text-center";
    //         d.appendChild(p);
    //         bookList.appendChild(d);
    // }
    // }

    


}





function removeAllBooks() {
    let users = DB.transaction("users", "readwrite").objectStore("users");
    let request = users.get(userId);
    
    request.onsuccess(){
        let user = request.result;
        user.books = [];
        displayMyBooks();
    }
}





// function removeBookF(e) {
//     console.log('here')
//     if (e.target.classList.contains('remove-book')) {
//         if (confirm('Are You Sure about that ?')) {
//             let bookID = Number(e.target.parentElement.parentElement.parentElement.getAttribute('my-book-id'));
//             let transaction = DB.transaction('myWishlist', 'readwrite');
//             let objectStore = transaction.objectStore('myWishlist');
//             objectStore.delete(bookID);
//             console.log(bookID)
//             transaction.oncomplete = () => {
//                 e.target.parentElement.parentElement.parentElement.remove();
//             }
//         }
//     }
// }




// if we delegated the event from the ul //will need the immediate parent of the fa-remove i to have .remove-book class
// bookList.addEventListener('click', removeBookF);
function removeBookF(e) {
    if (e.target.classList.contains('remove-book')) {
        if (confirm('Are You Sure about that ?')) {
            let bookID = Number(e.target.parentElement.parentElement.parentElement.getAttribute('my-book-id'));
            let transaction = DB.transaction('users', 'readwrite');
            let users = transaction.objectStore('users');
            let request = users.get(userId);
            
            request.onsuccess(){
                let user = request.result;
                user.books.splice(bookId,1);
                displayMyBooks();
            }
            // console.log(bookID)
            transaction.oncomplete = () => {
                e.target.parentElement.parentElement.parentElement.remove();
            }
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