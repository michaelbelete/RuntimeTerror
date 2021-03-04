import { SignUpUser, LogInUser } from "./methods.js";

const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const userName = document.querySelector("#userName");
const emailInput = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#passwordConfirm");
const signUp = document.querySelector("#signUpButton");
const login = document.querySelector("#loginButton");
const services = document.querySelector("#services");
const learnMore = document.querySelector("#learnMore");
const features = document.querySelector("#features");

signUp.addEventListener("click", SignUpUser);
login.addEventListener("click", LogInUser);
learnMore.addEventListener("click", () => {
  services.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
});
