const db = new Dexie('Bookacholics');

db.version(3).stores({
    users: "++useId, firstName, lastName, email, username, bio, hobbies, birthDate, currentCity, homeTown, education, registeredAt",
    books: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, userId",
    wishlist: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, whyWish, userId",
    posts: "++postId, bookId, postType, rating, comments, createdAt, updatedAt, userId",
    comments: "++commentId, comment, userId, createdAt, updatedAt"
});

const newUser = {
    firstName: "michael",
    lastName: "belete",
    email: "it.michael.belete@gmail.com",
    username: "@abc",
    bio: "some bio...",
    hobbies: "programming",
    birthDate: new Date(),
    currentCity: "Addis Ababa",
    homeTown: "Bahir Dar",
    education: "BSC",
    registeredAt: new Date(),
}

const book = {
        title: "some wwww",
        author: "me",
        edition: "sidk",
        publisher: "me",
        dateAdded: new Date(),
        shortDesc: "slorem aiusbasbjhbasjdbjasbbs",
        userId: 1
    }
    // db.users.put(newUser).then(function() {
    //     console.log("user created successfully")
    // }).catch((error) => console.log(error))

db.books.put(book)
    //creating a sample user
function loggedInUser() {
    return 1
}