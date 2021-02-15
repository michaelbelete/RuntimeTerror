const postForm = document.querySelector("#postFor")

const selectBooks = document.querySelector("#selectBooks")

document.addEventListener('DOMContentLoaded', loadMyBooks)


function loadMyBooks() {
    db.users.get(loggedInUser(), function(user) {
        const mybooks = user.books

        mybooks.forEach(book => {
            let option = document.createElement("option")
            option.setAttribute("value", book.bookId)
            option.textContent = book.title
            selectBooks.appendChild(option)
        });
    })

}