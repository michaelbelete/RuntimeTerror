"use strict";

var _methods = require("./methods.js");

var fName = document.querySelector("#firstName");
var lName = document.querySelector("#lastName");
var userName = document.querySelector("#userName");
var emailInput = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#passwordConfirm");
var signUp = document.querySelector("#signUpButton");
var login = document.querySelector("#loginButton");
var services = document.querySelector("#services");
var learnMore = document.querySelector("#learnMore");
var checkLogin = document.querySelector("#loginCheck");
var username = document.querySelector("#username");
signUp.addEventListener("click", _methods.SignUpUser);
login.addEventListener("click", _methods.LogInUser);
learnMore.addEventListener("click", function () {
  services.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
});
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