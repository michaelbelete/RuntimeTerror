const fullName = document.querySelector("#full_name");
const userName = document.querySelector("#user_name");
const email = document.querySelector("#email");
const bDate = document.querySelector("#b_date");
const sex = document.querySelector("#sex");
const pp_container = document.querySelector("#pp_container");

const id = window.localStorage.getItem("userId");

db.users.get(parseInt(id)).then((user) => {
  fullName.innerHTML = user.firstName + " " + user.lastName;
  userName.innerHTML = "@" + user.username;
  email.innerHTML = user.email;
  bDate.innerHTML = user.birthDate;
  sex.innerHTML = user.sex;
  profileSetter(user);
});

function imgElementCreate(imgSrc) {
  var img = document.createElement("img");
  img.src = imgSrc;
  img.height = "150";
  img.width = "150";
  img.id = "profile_p";
  // img.style.border = "0.1px solid black";
  img.className = "shadow p-1";
  pp_container.insertBefore(img, fullName);
}

function profileSetter(user) {
  if (user.sex.toLowerCase() == "male") {
    imgElementCreate("Assets/images/boss.png");
  } else if (user.sex.toLowerCase() == "female") {
    imgElementCreate("Assets/images/woman.png");
  }
}
