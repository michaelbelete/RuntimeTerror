import {
  editAboutMe,
  editButtonAboutMe,
  saveHobbies,
  editHobbies,
} from "./methods.js";

// $(document).ready(function() {
//     $('#header').load('includes/header.html')
//         // $('#books').select2();
// });

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
const editHobbiesButton = document.querySelector("#editButtonHobby");
const save = document.querySelector("#save");
const save_hobbies = document.querySelector("#save_hobbies");
const hobby1 = document.querySelector("#hobby-1");
const hobby2 = document.querySelector("#hobby-2");
const hobby3 = document.querySelector("#hobby-3");
const hobby4 = document.querySelector("#hobby-4");
const id = window.sessionStorage.getItem("userId");

edit.addEventListener("click", editButtonAboutMe);
save.addEventListener("click", editAboutMe);
save_hobbies.addEventListener("click", saveHobbies);
editHobbiesButton.addEventListener("click", editHobbies);

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
  hobby1.innerHTML = user.hobby_1;
  hobby2.innerHTML = user.hobby_2;
  hobby3.innerHTML = user.hobby_3;
  hobby4.innerHTML = user.hobby_4;
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

const checkLogin = document.querySelector("#loginCheck");

const username = document.querySelector("#username");

const userId = sessionStorage.getItem("userId");
if (userId) {
  checkLogin.style.display = "none";
  async function getProfile() {
    let user = await db.users.where("userId").equals(Number(userId)).first();
    username.firstElementChild.innerHTML = `<i class="fa fa-user pr-1"></i>  ${user.firstName} ${user.lastName}`;
  }
  //fetch logged in user
  getProfile();
  username.style.display = "block";
}
