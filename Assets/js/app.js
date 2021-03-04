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


const checkLogin = document.querySelector("#loginCheck")

const username = document.querySelector("#username")

signUp.addEventListener("click", SignUpUser);
login.addEventListener("click", LogInUser);

learnMore.addEventListener("click", () => {
    services.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
});

const userId = sessionStorage.getItem("userId")
if (userId) {
    checkLogin.style.display = "none"
    async function getProfile() {
        let user = await db.users.where("userId").equals(Number(userId)).first()
        username.firstElementChild.innerHTML = `<i class="fa fa-user pr-1"></i>  ${user.firstName} ${user.lastName}`

    }
    //fetch logged in user
    getProfile()
    username.style.display = "block"
}