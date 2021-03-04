import { editAboutMe, editButtonAboutMe } from "./methods.js";

const fullName = document.querySelector("#full_name");
const userName = document.querySelector("#user_name");
const email = document.querySelector("#email");
const bDate = document.querySelector("#b_date");
const sex = document.querySelector("#sex");
const pp_container = document.querySelector("#pp_container");
const nationality = document.querySelector("#nationality");
const homeTown = document.querySelector("#home_town");
const currentCity = document.querySelector("#current_city");
const education = document.querySelector("#education");
const nationalityEdit = document.querySelector("#nationality_edit");
const homeTownEdit = document.querySelector("#home_town_edit");
const currentCityEdit = document.querySelector("#current_city_edit");
const educationEdit = document.querySelector("#education");
const edit = document.querySelector("#editButton");
const save = document.querySelector("#save");

const id = window.sessionStorage.getItem("userId");

edit.addEventListener("click", editButtonAboutMe);
save.addEventListener("click", editAboutMe);

db.users.get(parseInt(id)).then((user) => {
  fullName.innerHTML = user.firstName + " " + user.lastName;
  userName.innerHTML = "@" + user.username;
  email.innerHTML = user.email;
  bDate.innerHTML = user.birthDate;
  sex.innerHTML = user.sex;
  nationality.innerHTML = user.nationality;
  currentCity.innerHTML = user.currentCity;
  homeTown.innerHTML = user.homeTown;
  education.innerHTML = user.edu;

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
