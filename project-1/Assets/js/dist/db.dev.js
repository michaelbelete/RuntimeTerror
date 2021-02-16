"use strict";

var db = new Dexie('Bookacholics');
db.version(3).stores({
  users: "++userId, firstName, lastName, email, &username, bio, hobbies, birthDate, currentCity, homeTown, education, profilePicture, registeredAt",
  books: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, userId",
  wishlist: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, whyWish, userId",
  posts: "++postId, bookId, postType, rating, comments, createdAt, updatedAt, userId",
  comments: "++commentId, postId, comment, userId, createdAt, updatedAt"
});
var newUser = {
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
  profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  registeredAt: new Date()
};
var book = {
  title: "some wwww",
  author: "me",
  edition: "sidk",
  publisher: "me",
  dateAdded: new Date(),
  shortDesc: "slorem aiusbasbjhbasjdbjasbbs",
  userId: 1
}; // db.users.put(newUser).then(function() {
//     console.log("user created successfully")
// }).catch((error) => console.log(error))
// db.books.put(book)
//creating a sample user

function loggedInUser() {
  return 1;
}