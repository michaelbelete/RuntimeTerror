"use strict";

var db = new Dexie('Bookaholics');
db.version(6).stores({
  users: "++userId, firstName, lastName, sex, email, &username, bio, hobbies, birthDate, currentCity, homeTown, education, registeredAt",
  books: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, userId",
  wishlist: "++bookId, title, author, edition, publisher, dateAdded, whyWish, userId",
  posts: "++postId, bookId, postType, rating, comments, createdAt, updatedAt, userId",
  comments: "++commentId, postId, comment, userId, createdAt, updatedAt"
});
var newUser = {
  firstName: "michael",
  lastName: "belete",
  sex: 'male',
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
var newUser2 = {
  firstName: "Michael",
  lastName: "Mesfin",
  sex: 'male',
  email: "it.michael.mesfin@gmail.com",
  username: "@cde",
  bio: "some bio...",
  hobbies: "programming",
  birthDate: new Date(),
  currentCity: "Addis Ababa",
  homeTown: "Bahir Dar",
  education: "BSC",
  profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  registeredAt: new Date()
};
var newUser3 = {
  firstName: "Liyu",
  lastName: "Belete",
  sex: 'male',
  email: "it.liyu.belete@gmail.com",
  username: "@fgh",
  bio: "some bio...",
  hobbies: "programming",
  birthDate: new Date(),
  currentCity: "Addis Ababa",
  homeTown: "Bahir Dar",
  education: "BSC",
  profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  registeredAt: new Date()
}; // const book = {
//         title: "some wwww",
//         author: "me",
//         edition: "sidk",
//         publisher: "me",
//         dateAdded: new Date(),
//         shortDesc: "slorem aiusbasbjhbasjdbjasbbs",
//         userId: 1,
//     }
// db.users.put(newUser).then(function() {
//     console.log("user created successfully")
// }).catch((error) => console.log(error))
// db.users.put(newUser2).then(function() {
//     console.log("user created successfully")
// }).catch((error) => console.log(error))
// db.users.put(newUser3).then(function() {
//     console.log("user created successfully")
// }).catch((error) => console.log(error))
// db.books.put(book)
//creating a sample user

function loggedInUser() {
  return 1;
}