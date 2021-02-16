const fullName = document.querySelector("#full_name");
const userName = document.querySelector("#user_name");
const email = document.querySelector("#email");
const bDate = document.querySelector("#b_date");

const id = window.localStorage.getItem("userId");
console.log(id);
db.users.get(parseInt(id)).then((user) => {
  fullName.innerHTML = user.firstName + " " + user.lastName;
  userName.innerHTML = "@" + user.username;
  email.innerHTML = user.email;
  bDate.innerHTML = user.birthDate;
});
