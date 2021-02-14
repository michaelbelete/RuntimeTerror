import { SignUpUser } from "./methods.js";

const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const userName = document.querySelector("#userName");
const emailInput = document.querySelector("#email");
const signUp = document.querySelector("#signUpButton");

signUp.addEventListener("click", SignUpUser);
