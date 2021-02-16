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

document.addEventListener('DOMContentLoaded', function() {
    loadMyBooks()
    loadPosts()
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
    const posts = await db.table("posts").orderBy("postId").reverse().toArray()
    posts.forEach(async function(post) {

        let book = await db.books.where("bookId").equals(parseInt(post.bookId)).first()
        let user = await db.users.where("userId").equals(post.userId).first()
        let comments = await db.comments.where("postId").equals(post.postId).count()

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
                        <a href="post.html" class=" text-primary  float-right"><i class="fa fa-comment"></i>
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
                    <h5 class="text-primary pt-1 m-0">${ user.firstName } ${user.lastName}</h5>
                    <small class="text-muted p-0">${ post.createdAt }</small>
                </div>
            </div>
            <div class="px-3 py-1">
                <h4 class="font-weight-light text-muted title">${ book.title }</h4>
            </div>

            <div class="post-image">
                <a href="post.html?id=${post.postId}"><img src="${ post.picture }" width="100%"></a>
            </div>
            <div class="px-3 text-justify w-100">
                <p class="text-muted">
                    ${ postNoHtmlTag.length > 100 ? postNoHtmlTag.substring(0,100) : postNoHtmlTag }    
                </p>
            </div>
    
            <div class="rating-comment px-4 pb-3">
                <div class="row">
                    <div class="col-md-8">
                        <div id="post-rate${post.postId }">${ post.rating }</div>
                    </div>
                    <div class="col-md-4">
                        <a href="post.html" class=" text-primary  float-right"><i class="fa fa-comment"></i>
                            ${ comments } Comments</a>
                    </div>
                </div>
            </div>
        </div>
        `
        }

        let htmlPost = new DOMParser().parseFromString(strPost, 'text/html')
        feeds.appendChild(htmlPost.body.firstChild)
    })
}
$(document).ready(function() {
    $('#header').load('includes/header.html')
    $('#books').select2();
});