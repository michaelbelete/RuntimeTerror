$(document).ready(function() {
    $('#header').load('includes/header.html')
});

const urlParams = new URLSearchParams(window.location.search)

const id = parseInt(urlParams.get('id'))

document.addEventListener('DOMContentLoaded', function() {
    checkPostId()
    loadSpecificPost()
})


function checkPostId() {
    if (id) {
        return
    } else {
        window.location.href = "home.html"
    }
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


}