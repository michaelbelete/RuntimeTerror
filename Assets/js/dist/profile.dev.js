"use strict";

var _methods = require("./methods.js");

$(document).ready(function () {
  $('#header').load('includes/header.html'); // $('#books').select2();
});
var fullName = document.querySelector("#full_name");
var userName = document.querySelector("#user_name");
var email = document.querySelector("#email");
var bDate = document.querySelector("#b_date");
var sex = document.querySelector("#sex");
var pp_container = document.querySelector("#pp_container");
var nationality = document.querySelector("#nationality");
var homeTown = document.querySelector("#home_town");
var currentCity = document.querySelector("#current_city");
var education = document.querySelector("#education");
var nationalityEdit = document.querySelector("#nationality_edit");
var homeTownEdit = document.querySelector("#home_town_edit");
var currentCityEdit = document.querySelector("#current_city_edit");
var educationEdit = document.querySelector("#education");
var edit = document.querySelector("#editButton");
var editHobbiesButton = document.querySelector("#editButtonHobby");
var save = document.querySelector("#save");
var save_hobbies = document.querySelector("#save_hobbies");
var hobby_1 = document.querySelector("#hobby-1");
var hobby_2 = document.querySelector("#hobby-2");
var hobby_3 = document.querySelector("#hobby-3");
var hobby_4 = document.querySelector("#hobby-4");
var id = window.sessionStorage.getItem("userId");
edit.addEventListener("click", _methods.editButtonAboutMe);
save.addEventListener("click", _methods.editAboutMe);
save_hobbies.addEventListener("click", _methods.saveHobbies);
editHobbiesButton.addEventListener("click", _methods.editHobbies);
db.users.get(parseInt(id)).then(function (user) {
  fullName.innerHTML = user.firstName + " " + user.lastName;
  userName.innerHTML = "@" + user.username;
  email.innerHTML = user.email;
  bDate.innerHTML = user.birthDate;
  sex.innerHTML = user.sex;
  nationality.innerHTML = user.nationality;
  currentCity.innerHTML = user.currentCity;
  homeTown.innerHTML = user.homeTown;
  education.innerHTML = user.edu;
  hobby_1.innerHTML = user.hobby_1;
  hobby_2.innerHTML = user.hobby_2;
  hobby_3.innerHTML = user.hobby_3;
  hobby_4.innerHTML = user.hobby_4;
  profileSetter(user);
});

function imgElementCreate(imgSrc) {
  var img = document.createElement("img");
  img.src = imgSrc;
  img.height = "150";
  img.width = "150";
  img.id = "profile_p"; // img.style.border = "0.1px solid black";

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

var checkLogin = document.querySelector("#loginCheck");
var username = document.querySelector("#username");
var userId = sessionStorage.getItem("userId");

if (userId) {
  var getProfile = function getProfile() {
    var user;
    return regeneratorRuntime.async(function getProfile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(db.users.where("userId").equals(Number(userId)).first());

          case 2:
            user = _context.sent;
            username.firstElementChild.innerHTML = "<i class=\"fa fa-user pr-1\"></i>  ".concat(user.firstName, " ").concat(user.lastName);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }; //fetch logged in user


  checkLogin.style.display = "none";
  getProfile();
  username.style.display = "block";
}