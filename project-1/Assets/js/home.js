ClassicEditor
            .create(document.querySelector('#postArea'))
            .catch(error => {
                console.error(error);
            });

        $(function () {

            $("#rateYo").rateYo({
                starWidth: "30px",
                ratedFill: "#07a8e2",
                halfStar: true
            });

            $("#post-rate1").rateYo({
                rating: 4,
                starWidth: "20px",
                ratedFill: "#07a8e2",
                halfStar: true,
                readOnly: true,
            })

            $("#post-rate2").rateYo({
                rating: 4,
                starWidth: "20px",
                ratedFill: "#07a8e2",
                halfStar: true,
                readOnly: true,
            })
        });

        $(document).ready(function () {
            $('#header').load('includes/header.html')
            $('#books').select2();
        });



//abandoned __ to Mike
// let DB;


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
//     // displayMyFeed();
//     // displayMyBooks();
//     // displayNewMembers();
// }

// myBookDB.onupgradeneeded = function (e) {
//     let db = e.target.result;
//     let objectStore = db.createObjectStore('myBooks', {
//         keyPath: 'id',
//         autoIncrement: true
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
//     objectStore.createIndex('dateModified', 'dateModified', {
//         unique: true
//     });
//     console.log('Database created.');
// }