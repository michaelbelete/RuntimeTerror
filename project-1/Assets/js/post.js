$(document).ready(function() {
    $('#header').load('includes/header.html')
});

const urlParams = new URLSearchParams(window.location.search)

const id = parseInt(urlParams.get('id'))

const specificPost = document.querySelector('#specificPost')

const comment = document.querySelector('#comment')
const commentBtn = document.querySelector("#commentBtn")


document.addEventListener('DOMContentLoaded', function() {
    checkPostId()
    loadSpecificPost()
})

commentBtn.addEventListener("click", addComment)


function checkPostId() {
    if (id) {
        return
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
async function loadSpecificPost() {
    const post = await db.posts.where({
        postId: id
    }).first()
    const book = await db.books.where("bookId").equals(parseInt(post.bookId)).first()
    const user = await db.users.where("userId").equals(post.userId).first()
    const commentData = await db.comments.where("postId").equals(post.postId)
    const commentCount = await commentData.count()
    const comments = await commentData.toArray()

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

    let htmlPost = new DOMParser().parseFromString(strPost, 'text/html')
    specificPost.appendChild(htmlPost.body.firstChild)
    generateStar(post.postId, post.rating)

    // comments.forEach(comment => {

    // });
}

async function addComment() {
    if (comment.value === "") {
        console.log("empty")
    } else {
        const newComment = {
            userId: loggedInUser(),
            postId: id,
            comment: comment.value,
            createdAt: new Date(),
            updatedAt: ""
        }

        await db.comments.add(newComment).then((result) => {
            console.log(result)
            console.log("successful")
        }).catch((error) => console.log(error))
    }
}