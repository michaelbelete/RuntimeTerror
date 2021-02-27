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
const postMessage = document.querySelector("#postMessage")
const feeds = document.querySelector("#feeds")
const postLoader = document.querySelector("#postLoader")
const noPost = document.querySelector("#noPost")

document.addEventListener('DOMContentLoaded', function() {
    loadMyBooks()
    loadPosts()
    loadRecentBooks();
})

async function loadMyBooks() {
    const mybooks = await db.books.where("userId").equals(loggedInUser()).toArray()

    mybooks.forEach(book => {
        let option = document.createElement("option")
        option.setAttribute("value", book.bookId)
        option.textContent = book.title
        selectBooks.appendChild(option)
    });
}

function generateStar(id, rating) {
    $(function() {
        $(`#post-rate${id}`).rateYo({
            rating: rating,
            starWidth: "20px",
            ratedFill: "#07a8e2",
            halfStar: true,
            readOnly: true,
        })
    })
}
$(function() {

    var $rateYo = $("#rateYo").rateYo({
        starWidth: "30px",
        ratedFill: "#07a8e2",
        halfStar: true
    });

    $("#postBtn").click(function() {
        var rating = $rateYo.rateYo("rating");
        if (editor.getData() == "" || rating == 0 || postType == "") {
            postMessage.classList.add("alert-danger")
            postMessage.textContent = "Please fill the required input"
            postMessage.style.display = "block"
        } else {

            const newPost = {
                bookId: parseInt(selectBooks.value),
                userId: loggedInUser(),
                postType: postType.value, //rec, rev
                rating: rating,
                post: editor.getData(),
                picture: "https://images.unsplash.com/photo-1549122728-f519709caa9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80",
                createdAt: new Date(),
                updatedAt: ""
            }

            console.log(newPost)
            db.posts.add(newPost).then(function() {
                // postMessage.classList.remove("alert-danger")
                postMessage.classList.add("alert-success")
                postMessage.textContent = "Posted"
                postMessage.style.display = "block"
                    //clear post form
                postType.value = null
                $rateYo.rateYo("rating", 0)
                editor.setData(" ")
                loadPosts()
            }).catch((error) => {
                postMessage.classList.add("alert-danger")
                postMessage.textContent = `Error ${ error }`
                postMessage.style.display = "block"
            })
        }
    })
});


async function loadPosts() {

    const postCount = await db.posts.count()
    console.log(postCount)
    if (postCount == 0) {
        noPost.style.display = "block"
    } else {
        const posts = await db.table("posts").orderBy("postId").reverse().toArray()
        posts.forEach(async function(post) {
            let book = await db.books.where("bookId").equals(parseInt(post.bookId)).first()
            let user = await db.users.where("userId").equals(post.userId).first()
            let comments = await db.comments.where("postId").equals(post.postId).count()
            console.log(user)
            let postNoHtmlTag = post.post.replace(/(<([^>]+)>)/gi, "")
            if (post.picture == "") {
                var strPost = `
            <div class="card card-body mb-4 p-0">
            <div class="row p-3">
                <div class="col-2">
                    <a href="profile.html"><img src="${user.profilePicture}" alt="profile" class="rounded-circle" width="70"
                            height="70">
                    </a>
                </div>
                <div class="col-10 p-2">
                    <h5 class="text-primary pt-1 m-0">${ user.firstName } ${user.lastName}</h5>
                    <small class="text-muted p-0">${ post.createdAt }</small>
                </div>
            </div>
            <div class="px-3 py-1">
                <h4 class="font-weight-light text-muted title">${ book.title }</h4>
            </div>
            <div class="px-3 text-justify w-100">
                <p class="text-muted">
                    ${ postNoHtmlTag.length > 100 ? postNoHtmlTag.substring(0,100) : postNoHtmlTag }    
                </p>
            </div>
    
            <div class="rating-comment px-4 pb-3">
                <div class="row">
                    <div class="col-md-8">
                        <div id="post-rate${post.postId}">${ post.rating }</div>
                    </div>
                    <div class="col-md-4">
                        <a href="post.html?id=${post.postId}" class=" text-primary  float-right"><i class="fa fa-comment"></i>
                            ${ comments } Comments</a>
                    </div>
                </div>
            </div>
        </div>
        `
            } else {
                var strPost = `
            <div class="card card-body mb-4 p-0">
            <div class="row p-3">
                <div class="col-2">
                    <a href="profile.html?id=${user.userId}"><img src="${user.profilePicture}" alt="profile" class="rounded-circle" width="70"
                            height="70">
                    </a>
                </div>
                <div class="col-10 p-2">
                    <h5 class="text-primary pt-1 m-0">${ user.firstName } ${user.lastName} <small class="text-muted"><i class="fa fa-angle-right"></i> ${ post.postType == "recommendation" ? "Recommended": "Reviewed" } ${ book.title } By <b>${ book.author }</b></small></h5>
                    <small class="text-muted p-0">${ post.createdAt }</small>
                </div>
            </div>

            <div class="post-image">
                <a href="post.html?id=${post.postId}"><img src="${ post.picture }" width="100%"></a>
            </div>
            <div class="px-3 border-left border-bottom border-right text-justify w-100">
                <p class="text-muted border-left border-right border-bottom p-3">
                    ${ postNoHtmlTag.length > 100 ? postNoHtmlTag.substring(0,100) : postNoHtmlTag }   
                    <a href="post.html?id=${post.postId}">...Read More</a>  
                </p>
            </div>
    
            <div class="rating-comment px-4 py-2 pb-3">
                <div class="row">
                    <div class="col-md-8">
                        <div id="post-rate${post.postId }">${ post.rating }</div>
                    </div>
                    <div class="col-md-4">
                        <a href="post.html?id=${post.postId}" class=" text-primary  float-right"><i class="fa fa-comment"></i>
                            ${ comments } Comments</a>
                    </div>
                </div>
            </div>
        </div>
        `
            }

            let htmlPost = new DOMParser().parseFromString(strPost, 'text/html')
            postLoader.style.display = "none"
            console.log(postLoader)
            feeds.appendChild(htmlPost.body.firstChild)
            generateStar(post.postId, post.rating)
        })
    }
}



async function loadRecentBooks() {
    let bookList = document.querySelector('section > div > div:last-child > div');
    let books = await db.books.orderBy('bookId').reverse().limit(5).toArray();
    books.forEach(book => {
        let div = document.createElement('div');
        div.className = "row mb-4";
        div.innerHTML += `<div class="col-3 px-2">
            <img src="https://img.icons8.com/cute-clipart/64/000000/book.png" height="55" />
        </div>
        <div class="col-8">
            <p class="title font-wight-bold p-0 m-0">${book.title}</p>
            <small class="text-muted">${book.author}</small>
        </div>`;
        bookList.insertBefore(div, bookList.lastElementChild);
    })
}



$(document).ready(function() {
    $('#header').load('includes/header.html')
    $('#books').select2();
});