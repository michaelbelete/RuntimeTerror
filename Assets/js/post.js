$(document).ready(function() {
    $('#header').load('includes/header.html')
    $('#starRating').rateYo({
        rating: 4.5,
        starWidth: "35px",
        ratedFill: "#07a8e2",
        halfStar: true,
        readOnly: true,
    })
});

const urlParams = new URLSearchParams(window.location.search)

const id = parseInt(urlParams.get('id'))

const specificPost = document.querySelector('#specificPost')
const specificComment = document.querySelector('#specificComments')

const comment = document.querySelector('#comment')
const commentBtn = document.querySelector("#commentBtn")

const loader = document.querySelector('#specificPostLoader')

//book rating vars
const bookRating = document.querySelector('#bookRating')
const recentReviews = document.querySelector('#recentReviews')

document.addEventListener('DOMContentLoaded', function() {
    checkPostId()
    loadSpecificPost().then(async() => {

        let post = await db.posts.where({
            postId: id
        }).first()

        let book = await db.books.where({
            bookId: post.bookId
        }).first()

        let countFromMyBook = await db.books.where("title").equals(book.title).count()
        let countFromWish = await db.wishlist.where("title").equals(book.title).count()


        const addToWishList = document.querySelector("#addToWishList")
        const wishListData = document.querySelector("#wishListData")

        if (countFromMyBook !== 0) {
            addToWishList.textContent = "Already Read"
            addToWishList.setAttribute("disabled", "disabled")
        } else {
            if (countFromWish) {
                addToWishList.textContent = "Added"
                addToWishList.setAttribute("disabled", "disabled")
            }
        }


        addToWishList.addEventListener("click", function() {

            const newWish = {
                title: book.title,
                author: book.author,
                edition: book.edition,
                publisher: book.publisher,
                dateAdded: new Date(),
                whyWish: book.whyWish,
                userId: loggedInUser()
            }



            db.wishlist.put(newWish).then(function() {
                addToWishList.textContent = "Added"
                addToWishList.setAttribute("disabled", "disabled")
            }).catch((error) => console.log(error))
        })
    })
})



function checkPostId() {
    if (id || id === undefined || id === null) {
        const post = db.posts.where
    } else {
        window.location.href = "home.html"
    }
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


async function loadReviews(title, postId) {
    let resultPost = []

    const reviewPost = await db.posts.where("postId").equals(postId).toArray()
    reviewPost.forEach((result) => {
        resultPost.push(result)
    })
    const book = await db.books.where('title').equalsIgnoreCase(title).first()

    const reviewTitle = await db.posts.where("bookId").equals(book.bookId).toArray()
    reviewTitle.forEach((result) => {
        resultPost.push(result)
    })

    resultPost = resultPost.reverse(function(a, b) {
        return a - b
    })

    resultPost = resultPost.filter((post, index, self) =>
        index === self.findIndex((t) => (
            post.userId === post.userId && post.postId === post.postId
        ))
    )
    if (resultPost.length >= 5) {
        return resultPost.slice(0, 5)
    } else {
        return resultPost
    }
}


async function averageRatingOfBook(bookID) {
    let bookPosts = await db.posts.where("bookId").equals(bookID).toArray()
    let avgRating = 0;
    let sum = 0;
    let numberOfBookPosts = bookPosts.length;
    if (numberOfBookPosts) {
        bookPosts.forEach(bookPost => {
            sum += bookPost.rating
        })
        avgRating = sum / numberOfBookPosts;

        return { rating: avgRating, rateNumber: numberOfBookPosts };
    }

    return -1
}

async function loadSpecificPost() {

    loader.style.display = "block"
    let post = await db.posts.where({
        postId: id
    }).first()

    const book = await db.books.where("bookId").equals(parseInt(post.bookId)).first()
    const user = await db.users.where("userId").equals(parseInt(post.userId)).first()
    const commentData = await db.comments.where("postId").equals(post.postId)
    const commentCount = await commentData.count()
    const comments = await commentData.toArray()

    loadReviews(book.title, post.postId).then((result) => {
        console.log(result)
        const reviews = result.filter((posts => posts.postType === 'review'))

        console.log(reviews)
        reviews.forEach(async(review) => {
            let usr = await db.users.where("userId").equals(parseInt(review.userId)).first()
            let strReview = `
                <div class="row pl-2 border-bottom py-2">
                    <div class="col-sm-3">
                        <a href="profile.html?id=${ usr.userId }"><img src="${usr.profilePicture}" alt="profile" class="rounded-circle ml-3"
                                width="70" height="70">
                        </a>
                    </div>
                    <div class="col-sm-8">
                        <h5 class="text-primary pt-1 m-0">${ usr.firstName} ${ usr.lastName }</h5>
                        <small class="text-muted">${ review.post.replace(/(<([^>]+)>)/gi, "") }</small>
                    </div>
            </div>
            `

            let htmlReview = new DOMParser().parseFromString(strReview, 'text/html')
            recentReviews.appendChild(htmlReview.body.firstChild)

        })
    })
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
            ${ post.post }    
        </p>
    </div>

    <div class="rating-comment px-4 pb-3">
        <div class="row">
            <div class="col-md-8">
                <div id="post-rate${post.postId}">${ post.rating }</div>
            </div>
            <div class="col-md-4">
                <a href="post.html" class=" text-primary  float-right"><i class="fa fa-comment"></i>
                    ${ commentCount } Comments</a>
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
            ${post.post}   
        </p>
    </div>

    <div class="rating-comment px-4 py-2 pb-3">
        <div class="row">
            <div class="col-md-8">
                <div id="post-rate${post.postId }">${ post.rating }</div>
            </div>
            <div class="col-md-4">
                <a href="post.html" class=" text-primary  float-right"><i class="fa fa-comment"></i>
                    ${ commentCount } Comments</a>
            </div>
        </div>
    </div>
</div>
`
    }
    specificPost.innerHTML = ""
    specificComment.innerHTML = ""
    bookRating.innerHTML = ""

    var avgRating = await averageRatingOfBook(book.bookId).then((avgBook) => {
        return avgBook
    })


    const strBookRating = `
    <div class="col-md-5 pl-3 pt-2 pr-4 text-center">
    <img src="${ post.picture }" width="100%" height="120px">
    <h2 class="display-4 pt-2 font-weight-bold text-warning">${ avgRating.rating }</h2>
    <p class="mb-1">Average Rating</p>
    <small class="text-muted">${ avgRating.rateNumber } Total Ratings</small>
</div>
<div class="col-md-6 pl-0 pt-3">
    <h4 class="pl-3 font-weight-bold">${ book.title }</h4>
    <p class="font-weight-lighter text-muted pt-2 pl-3 mb-1">Author: ${ book.author }</p>
    <small class="font-weight-lighter text-muted pl-3 p-0">Publisher: ${ book.publisher }</small>
    <div id="starRating" class="pt-3 pb-2"></div>
    <button class="btn btn-outline-primary btn-sm p-2 mt-2 ml-2" id="addToWishList">Add to wishlist</button>
    </div>
    `

    let htmlPost = new DOMParser().parseFromString(strPost, 'text/html')
    specificPost.appendChild(htmlPost.body.firstChild)
    generateStar(post.postId, post.rating)

    bookRating.innerHTML = strBookRating
    $(function() {
        $(`#starRating`).rateYo({
            rating: avgRating.rating,
            starWidth: "30px",
            ratedFill: "#ffaf01",
            halfStar: true,
            readOnly: true,
        })
    })

    comments.forEach(async comment => {
        const user = await db.users.where("userId").equals(parseInt(comment.userId)).first()
        let strComment = `
            <div class="row px-4 pb-2" id="comments">
            <div class="col-sm-1 p-4">
                <a href="profile.html?id=${comment.userId}"><img src="${user.profilePicture}" alt="profile" class="rounded-circle" width="70"
                        height="70">
                </a>
            </div>
            <div class="col-sm-10 p-4 ml-3">
                <h5 class="text-primary pt-1 m-0">${ user.firstName } ${ user.lastName } <span class="text-muted" style="font-size: 14px;"><i class="fa fa-angle-right"></i> ${ comment.createdAt }</span></h5>
                <small class="text-muted">${ comment.comment }</small>
            </div>
        </div>
        `

        let htmlPost = new DOMParser().parseFromString(strComment, 'text/html')
        specificComment.appendChild(htmlPost.body.firstChild)
    });

    loader.style.display = "none"
}

async function addComment() {
    const commentMessage = document.querySelector('#commentMessage')
    if (comment.value === "") {
        commentMessage.innerHTML = ""
        const alert = document.createElement("div")
        alert.className = "alert alert-danger"
        alert.textContent = "please fill the required form"
        commentMessage.appendChild(alert)
    } else {
        const newComment = {
            userId: loggedInUser(),
            postId: id,
            comment: comment.value,
            createdAt: new Date(),
            updatedAt: ""
        }

        await db.comments.add(newComment).then((result) => {
            commentMessage.innerHTML = ""
            const alert = document.createElement("div")
            alert.className = "alert alert-success"
            alert.textContent = "commented"
            commentMessage.appendChild(alert)
            comment.value = ''
        }).catch((error) => {
            commentMessage.innerHTML = ""
            const alert = document.createElement("div")
            alert.className = "alert alert-danger"
            alert.textContent = error
            commentMessage.appendChild(alert)
        })
        loadSpecificPost()
    }
}