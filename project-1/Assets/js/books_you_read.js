// book add form ... pending

const addBook = document.querySelector('#addBook')

const searchFilter = document.querySelector('input[type="search"]');

const titleInput = document.querySelector('#title');
const editionInput = document.querySelector('#title');
const authourInput = document.querySelector('#title');
const publisherInput = document.querySelector('#title');

const bookList = document.querySelector('.book-list');

const removeBooks = document.querySelector('.remove-all') //possible under the more options (three dots)
const removeBook = document.querySelector('.remove-all') //without delegation


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
    let objectStore = db.createObjectStore('myBooks', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('bookTitle', 'bookTitle', { unique: false });
    objectStore.createIndex('edition', 'edition', { unique: false }); //might need us to add it in the My Books page
    // objectStore.createIndex('publicationDate', 'publicationDate', { unique: false }); //
    objectStore.createIndex('author', 'author', { unique: false });
    objectStore.createIndex('publisher', 'publisher', { unique: false });
    objectStore.createIndex('dateAdded', 'dateAdded', { unique: true });
    objectStore.createIndex('dateModified', 'dateModified', { unique: true });
    console.log('Database created.');
}



addBook.addEventListener('submit', addNewTask);

function addNewTask(e) {
    e.preventDefault();

    if (!taskInput.value) {
        alert("nah"); //will change it
        return;
    }

    let newTask = {
        bookTitle: titleInput.value,
        edtion: editionInput.value,
        author: authourInput,
        publisher: publisherInput,
        dateAdded: Date(),
        dateModified: Date()
    }

    let objectStore = DB.transaction(['myBooks'], 'readwrite').objectStore('myBooks');

    let request = objectStore.add(newTask);

    request.onsuccess = () => {
        form.reset();
        // will potentially do other things here
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
    while (bookList.firstChild) { bookList.removeChild(taskList.firstChild); }

    let objectStore = DB.transaction('myBooks').objectStore('myBooks');
    objectStore.openCursor().onsuccess = function (e) {
        let cursor = e.target.result;
        if (cursor) {
            let li = document.createElement('li');
            li.className = "list-group-item d-flex p-0 border-0 mb-2";
            li.setAttribute('my-book-id', cursor.value.id); // will be useful for deleting [through .delete()]

            li.innerHTML = `<div class="col-6 p-0 d-flex">
            <div class="col-2 p-0">
              <i class="fa fa-book fa-3x text-secondary"></i>
            </div>
            <div class="col-10 p-0">
              <h6>${cursor.value.bookTitle} <i class="fa fa-caret-right" aria-hidden="true"></i><span> ${cursor.value.author}</span></h6>
              <p class="text-muted">${cursor.value.publisher}</p>
            </div>
          </div>
          <div class="col-3 p-0">
            <div class="dropdown">
              <button class="btn btn-light btn-outline-dark btn-sm dropdown-toggle" type="button" id="dropdownMenu"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Choose...
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                <a class="dropdown-item" href="#">Private</a>
                <a class="dropdown-item" href="#">Public</a>
              </div>
            </div>

          </div>
          <div class="col-3 p-0">
            <a href="modifyBook.html?id=${cursor.value.id}"><i class="fas fa-edit text-secondary"></i></a>
            <i class="fas fa-trash text-danger remove-book"></i>
            <a href=""><i class="fas fa-ellipsis-h bg-dark border rounded-pill text-white"></i></a>
          </div>`
            
          
            bookList.appendChild(li);
            
            cursor.continue();
        }
    }

    
}



removeBooks.addEventListener('click', removeAllBooks);

function removeAllBooks() {
    let myBooks = DB.transaction("myBooks", "readwrite").objectStore("myBooks");
    myBooks.clear();
    displayMyBooks();
}



removeBook.addEventListener('click', removeBook);

function removeBook(e) {
    if (e.target.classList.contains('remove-book')) {
        if (confirm('Are You Sure about that ?')) {
            let bookID = Number(e.target.parentElement.parentElement.getAttribute('my-book-id'));
            let objectStore = DB.transaction('myBooks', 'readwrite').objectStore('myBooks');
            objectStore.delete(bookID);
            transaction.oncomplete = () => {
                e.target.parentElement.parentElement.remove();
            }
        }
    }
}




// if we delegated the event from the ul //will need the immediate parent of the fa-remove i to have .remove-book class
// bookList.addEventListener('click', removeBook);
// function removeBook(e) {
//     if (e.target.parentElement.classList.contains('remove-book')) {
//         if (confirm('Are You Sure about that ?')) {
//             let bookID = Number(e.target.parentElement.parentElement.getAttribute('my-book-id'));
//             let objectStore = DB.transaction('myBooks', 'readwrite').objectStore('myBooks');
//             objectStore.delete(bookID);
//             transaction.oncomplete = () => {
//                 e.target.parentElement.parentElement.remove();
//             }
//         }
//     }
// }




searchFilter.addEventListener('keyup', filterBooks);

function filterBooks (){
    document.querySelectorAll('.list-group-item').forEach(el => {
        if (el.textContent.includes(searchFilter.value)){
            el.style.display = "block";
            return;
        }
        el.style.display = "none";
    });



}