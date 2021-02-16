import { SignUpUser } from "./methods.js";

const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const userName = document.querySelector("#userName");
const emailInput = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#passwordConfirm");
const signUp = document.querySelector("#signUpButton");

signUp.addEventListener("click", SignUpUser);
