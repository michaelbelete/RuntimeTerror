const db = new Dexie('Bookaholics');

db.version(6).stores({
    users: "++userId, firstName, lastName, sex, email, &username, bio, hobbies, birthDate, currentCity, homeTown, education, registeredAt",
    books: "++bookId, title, author, edition, publisher, dateAdded, shortDesc, userId",
    wishlist: "++bookId, title, author, edition, publisher, dateAdded, whyWish, userId",
    posts: "++postId, bookId, postType, rating, comments, createdAt, updatedAt, userId",
    comments: "++commentId, postId, comment, userId, createdAt, updatedAt"
});

const newUser = {
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
        registeredAt: new Date(),
    }
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

const newUser2 = {
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
    registeredAt: new Date(),
}

const newUser3 = {
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
    registeredAt: new Date(),
}

// const book = {
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
    const userId = sessionStorage.getItem("userId")
    return userId
}