"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUpUser = SignUpUser;
exports.LogInUser = LogInUser;
exports.editAboutMe = editAboutMe;
exports.editButtonAboutMe = editButtonAboutMe;
exports.saveHobbies = saveHobbies;
exports.editHobbies = editHobbies;

var _common = require("./common.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fName = document.querySelector("#firstName");
var lName = document.querySelector("#lastName");
var emailInput = document.querySelector("#email");
var userNameInput = document.querySelector("#userName");
var password = document.querySelector("#passwordSignUp");
var confirmPassword = document.querySelector("#confirmPasswordSignUp");
var birthDate = document.querySelector("#birthDate");
var sexContainer = document.querySelector("#sexContainer");
var male = document.querySelector("#customRadioInline1");
var female = document.querySelector("#customRadioInline2");
var userNameLogin = document.querySelector("#userNameLogin");
var passwordLogin = document.querySelector("#passwordLogin");
var passwordLoginError = document.querySelector("#passwordLoginError");
var userNameLoginError = document.querySelector("#userNameLoginError");
var nationality = document.querySelector("#nationality");
var homeTown = document.querySelector("#home_town");
var currentCity = document.querySelector("#current_city");
var education = document.querySelector("#education");
var nationalityEdit = document.querySelector("#nationality_edit");
var homeTownEdit = document.querySelector("#home_town_edit");
var currentCityEdit = document.querySelector("#current_city_edit");
var educationEdit = document.querySelector("#education_edit");
var hobby_1_edit = document.querySelector("#hobby_1_edit");
var hobby_2_edit = document.querySelector("#hobby_2_edit");
var hobby_3_edit = document.querySelector("#hobby_3_edit");
var hobby_4_edit = document.querySelector("#hobby_4_edit");
var save = document.querySelector("#save");
var id = window.sessionStorage.getItem("userId");
var sex = ""; // function for the sign up

function SignUpUser(e) {
  e.preventDefault();

  if (fName.value == "") {
    fName.style.border = "2px solid red";
  } else if (lName.value == "") {
    lName.style.border = "2px solid red";
  } else if (userNameInput.value == "") {
    userNameInput.style.border = "2px solid red";
  } else if (emailInput.value == "") {
    emailInput.style.border = "2px solid red";
  } else if (sexChecker() == null) {
    console.log(sexChecker());
    sexContainer.style.border = "2px solid red";
  } else if (birthDate.value == "") {
    birthDate.style.border = "2px solid red";
  } else if (password.value == "") {
    password.style.border = "2px solid red";
  } else if (confirmPassword.value == "") {
    confirmPassword.style.border = "2px solid red";
  } else {
    var passwordEncrypted = _common.crypt.encrypt(password.value);

    var confirmPasswordEncrypted = _common.crypt.encrypt(confirmPassword.value);

    if (confirmPasswordInputs(_common.crypt.decrypt(passwordEncrypted), _common.crypt.decrypt(confirmPasswordEncrypted))) {
      var _db$users$add;

      sexChecker();
      return db.users.add((_db$users$add = {
        firstName: fName.value,
        lastName: lName.value,
        username: userNameInput.value,
        email: emailInput.value,
        password: passwordEncrypted,
        birthDate: birthDate.value,
        edu: "-",
        sex: sex,
        nationality: "-",
        currentCity: "-",
        homeTown: "-",
        hobby_1: "Enter your hobby here"
      }, _defineProperty(_db$users$add, "hobby_1", "-"), _defineProperty(_db$users$add, "hobby_1", "-"), _defineProperty(_db$users$add, "hobby_1", "-"), _defineProperty(_db$users$add, "registeredAt", new Date()), _db$users$add)).then(function (id) {
        window.sessionStorage.setItem("userId", id);
        location.href = "profile.html";
        history.replaceState({}, "", "home.html");
      });
    } else {
      password.style.border = "2px solid red";
      confirmPassword.style.border = "2px solid red";
    }
  } // e.preventDefault();

} //Login user


function LogInUser(e) {
  e.preventDefault();
  var found = false;

  if (userNameLogin.value == "") {
    userNameLoginError.innerHTML = "Enter your username.";
    userNameLogin.style.border = "2px solid red";
  } else if (passwordLogin.value == "") {
    passwordLoginError.innerHTML = "Enter your password.";
    passwordLogin.style.border = "2px solid red";
  } else if (userNameLogin != "" && passwordLogin != "") {
    db.transaction("r", db.users, function () {
      db.table("users").toArray().then(function (users) {
        users.forEach(function (user) {
          if (user.username == userNameLogin.value) {
            found = true;

            var passUser = _common.crypt.decrypt(user.password);

            if (passUser == passwordLogin.value) {
              window.localStorage.setItem("userId", user.userId);
              location.href = "profile.html";
            } else {
              passwordLoginError.innerHTML = "Password not matched.";
              passwordLogin.style.border = "2px solid red";
              console.log("password not matched.");
            }
          }
        });

        if (found == false) {
          userNameLoginError.innerHTML = "Username not found.";
          userNameLogin.style.border = "2px solid red";
        }
      });
    });
  }
}

function editAboutMe() {
  db.users.update(parseInt(id), {
    nationality: nationalityEdit.value,
    currentCity: currentCityEdit.value,
    homeTown: homeTownEdit.value,
    edu: educationEdit.value
  });
  location.reload();
}

function saveHobbies() {
  db.users.update(parseInt(id), {
    hobby_1: hobby_1_edit.value,
    hobby_2: hobby_2_edit.value,
    hobby_3: hobby_3_edit.value,
    hobby_4: hobby_4_edit.value
  });
  location.reload();
}

function editButtonAboutMe() {
  db.users.get(parseInt(id)).then(function (user) {
    nationalityEdit.value = user.nationality;
    currentCityEdit.value = user.currentCity;
    homeTownEdit.value = user.homeTown;
    educationEdit.value = user.edu;
  });
}

function editHobbies() {
  db.users.get(parseInt(id)).then(function (user) {
    hobby_1_edit.value = user.hobby_1;
    hobby_2_edit.value = user.hobby_2;
    hobby_3_edit.value = user.hobby_3;
    hobby_4_edit.value = user.hobby_4;
  });
} //Check the value of radio button for sex


function sexChecker() {
  if (male.checked) {
    sex = "Male";
    return true;
  } else if (female.checked) {
    sex = "Female";
    return true;
  } else {
    return null;
  }
} // confirm password


function confirmPasswordInputs(password, confirmPassword) {
  if (password == confirmPassword) {
    return true;
  } else {
    return false;
  }
} // Check if user exists


function userChecker(username, usersArray) {
  for (var index = 0; index < usersArray.length; index++) {
    if (usersArray[index].username == username) {
      return usersArray.userId;
    }
  }

  return null;
}