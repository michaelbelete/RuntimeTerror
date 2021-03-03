"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUpUser = SignUpUser;
exports.LogInUser = LogInUser;

var _common = require("./common.js");

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
      sexChecker();
      return db.users.add({
        firstName: fName.value,
        lastName: lName.value,
        username: userNameInput.value,
        email: emailInput.value,
        password: passwordEncrypted,
        birthDate: birthDate.value,
        sex: sex,
        registeredAt: new Date(),
        profilePicture: "https://img.icons8.com/clouds/100/000000/user-male.png"
      }).then(function (id) {
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