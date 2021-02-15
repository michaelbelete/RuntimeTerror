const db = new Dexie('Bookacholics');
db.version(2).stores({
    users: "++useId, firstName, lastName, email, username, bio, hobbies, birthDate, currentCity, homeTown, education, regisetredAt, books, wishList, posts",
    books: "++bookId, title, author, edition, publisher, dateAdded, shortDesc",
    wishlist: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, whyWish",
    posts: "++postId, bookId, postType, rating, comments, createdAt, updatedAt",
});

//creating a sample user
function loggedInUser() {
    return 1
}

db.users.put(user).then((result) => {
    console.log("user is added")
}).catch((error) => {
    console.log(error)
})