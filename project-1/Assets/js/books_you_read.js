// need to change the active status of nav to MyBooks
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


// If we added sorting
// var isAlphaBeticalAsc = true;
// var isDateAsc = true;


let myBookDB = indexedDB.open('Bookaholics', 1);

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
    let objectStore = db.createObjectStore('myBooks', {
        keyPath: 'id',
        autoIncrement: true
    });
    objectStore.createIndex('bookTitle', 'bookTitle', {
        unique: false
    });
    objectStore.createIndex('edition', 'edition', {
        unique: false
    }); //might need us to add it in the My Books page
    // objectStore.createIndex('publicationDate', 'publicationDate', { unique: false }); //
    objectStore.createIndex('author', 'author', {
        unique: false
    });
    objectStore.createIndex('publisher', 'publisher', {
        unique: false
    });
    objectStore.createIndex('dateAdded', 'dateAdded', {
        unique: true
    });
    objectStore.createIndex('dateModified', 'dateModified', {
        unique: true
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
        bookTitle: titleInput.value,
        edition: editionInput.value,
        author: authorInput.value,
        publisher: publisherInput.value,
        dateAdded: Date(),
        dateModified: Date()
    }

    let transaction = DB.transaction(['myBooks'], 'readwrite');
    let objectStore = transaction.objectStore('myBooks');
    
    console.log(newBook)
    let request = objectStore.add(newBook);

    request.onsuccess = () => {
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
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }

    let objectStore = DB.transaction('myBooks').objectStore('myBooks');
    objectStore.openCursor().onsuccess = function (e) {
        let cursor = e.target.result;
        if (cursor) {
            let div = document.createElement('div');
            div.className = "row py-2 px-4 w-100 book";
            div.setAttribute('my-book-id', cursor.value.id); // will be useful for deleting [through .delete()]

            div.innerHTML = `<div class="col-7 d-flex">
              <div class="col-1 p-0 mr-3">
                <i class="fa fa-book fa-3x text-secondary"></i>
              </div>
              <div class="col-10 p">
                <h6 class="py-0"><b class="text-primary">${cursor.value.bookTitle} </b><i class="fa fa-caret-right"
                    aria-hidden="true"></i><span> ${cursor.value.author}</span></h6>
                <p class="text-muted py-0">${cursor.value.publisher}</p>
              </div>
            </div>
            <div class="col-2">
              <select name="" id="" class="form-control">
                <option value="">Private</option>
                <option value="">Public</option>
              </select>
            </div>
            <div class="col-3">
              <h4 class="px-2 pt-2">
                <a href="modifyBook.html?id=${cursor.value.id}"><i class="fas fa-edit text-secondary"></i></a>
                <i class="fas fa-trash text-danger remove-book"></i>
                <a href=""><i class="fas fa-ellipsis-h bg-dark border rounded-pill text-white"></i></a>
              </h4>
            </div>`


            bookList.prepend(div); //may wanna prepend

            cursor.continue();
        }
    }


}





function removeAllBooks() {
    let myBooks = DB.transaction("myBooks", "readwrite").objectStore("myBooks");
    myBooks.clear();
    displayMyBooks();
}





// function removeBookF(e) {
//     console.log('here')
//     if (e.target.classList.contains('remove-book')) {
//         if (confirm('Are You Sure about that ?')) {
//             let bookID = Number(e.target.parentElement.parentElement.parentElement.getAttribute('my-book-id'));
//             let transaction = DB.transaction('myBooks', 'readwrite');
//             let objectStore = transaction.objectStore('myBooks');
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
            let transaction = DB.transaction('myBooks', 'readwrite');
            let objectStore = transaction.objectStore('myBooks');
            objectStore.delete(bookID);
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