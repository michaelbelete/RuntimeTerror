let editor

ClassicEditor
    .create(document.querySelector('#postArea'))
    .then(newEditor => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

const postForm = document.querySelector("#postFor")

const selectBooks = document.querySelector("#selectBooks")
const postType = document.querySelector('#type')
const post = document.querySelector("#postArea")

document.addEventListener('DOMContentLoaded', loadMyBooks)


async function loadMyBooks() {
    const mybooks = await db.books.where("userId").equals(loggedInUser()).toArray()

    mybooks.forEach(book => {
        let option = document.createElement("option")
        option.setAttribute("value", book.bookId)
        option.textContent = book.title
        selectBooks.appendChild(option)
    });
}


$(function() {

    var $rateYo = $("#rateYo").rateYo({
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

    $("#postBtn").click(function() {
        var rating = $rateYo.rateYo("rating");

        const newPost = {
            bookId: 2,
            postType: postType.value, //rec, rev
            rating: rating,
            post: editor.getData(),
            comments: [],
            createdAt: new Date(),
            updatedAt: ""
        }

        db.posts.put(newPost).then(function() {
            console.log("posted")
        }).catch((error) => {
            console.log(error)
        })
    })
});

$(document).ready(function() {
    $('#header').load('includes/header.html')
    $('#books').select2();
});