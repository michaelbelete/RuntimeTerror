const db = new Dexie("Bookacholics");

db.version(6).stores({
  users:
    "++userId, firstName, sex, lastName, password, email, username, bio, hobbies, birthDate, currentCity, homeTown, education, registeredAt",
  books:
    "++bookId, title, author, edition, publisher, dateAdded, shortDesc, userId",
  wishlist:
    "++bookId, title, author, edition, publisher, dateAdded, shortDesc, whyWish, userId",
  posts:
    "++postId, bookId, postType, rating, comments, createdAt, updatedAt, userId",
  comments: "++commentId, comment, userId, createdAt, updatedAt",
});

//creating a sample user
// const user = {
//     "userId": 1,
//     "firstName": "Michael",
//     "lastName": "Belete",
//     "email": "mike@mike.com",
//     "username": "@abc",
//     "bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ducimus consequatur, omnis tenetur tempore sint hic, minima alias iusto, reprehenderit fugit beatae! Quaerat veniam eum tempora voluptatibus, vitae nam dicta",
//     "hobbies": "programming",
//     "birthdate": "20/09/2000",
//     "birthplace": "bahirdar",
//     "currentCity": "addis ababa",
//     "homeTown": "bahirdar",
//     "education": "it",
//     "profilePicture": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "coverPicture": "",
//     "registeredAt": "18/09/2000",
//     "books": [{
//         "bookId": "1",
//         "title": "some book",
//         "author": "me",
//         "edition": "1",
//         "publisher": "me",
//         "dateAdded": "new",
//         // "dateModified":"", //books can't really be edited/modified
//         "shortDesc": "loremakdhijbsjfdbjsbbasdbabd"
//     }],
//     "wishlist": [{
//         "bookId": "1",
//         "title": "some book",
//         "author": "me",
//         "edition": "1",
//         "publisher": "me",
//         "dateAdded": "new",
//         // "dateModified":"", //books can't really be edited/modified
//         "shortDesc": "loremakdhijbsjfdbjsbbasdbabd",
//         // "dateModified":"", //wishlist books might be edited if they are just about to be release and the their title  is not set (like A Song of Ice and Fires' Dream of Spring)
//         "whyWish": ""
//     }],
//     "posts": [{
//         "bookId": "1",
//         "postType": "rec", //rec, rev
//         "rating": 3.5,
//         "post": "lorem....",
//         "comments": [{
//             "userId": 1,
//             "comment": "wow amazing",
//             "createdAt": "20/09/2000",
//             "updatedAt": ""
//         }],
//         "createdAt": "20/09/2000",
//         "updatedAt": ""
//     }]
// }
// db.users.put(user).then((result) => {
//     console.log(result)
//     alert("Nice")
// }).catch((error) => {
//     console.log(error)
// })
