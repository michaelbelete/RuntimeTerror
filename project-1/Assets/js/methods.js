import { crypt } from "./common.js";
const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const userNameInput = document.querySelector("#userName");
const password = document.querySelector("#passwordSignUp");
const confirmPassword = document.querySelector("#confirmPasswordSignUp");
const birthDate = document.querySelector("#birthDate");
const sexContainer = document.querySelector("#sexContainer");
const male = document.querySelector("#customRadioInline1");
const female = document.querySelector("#customRadioInline2");
const userNameLogin = document.querySelector("#userNameLogin");
const passwordLogin = document.querySelector("#passwordLogin");
const passwordLoginError = document.querySelector("#passwordLoginError");
const userNameLoginError = document.querySelector("#userNameLoginError");

let sex = "";

// function for the sign up

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
        const passwordEncrypted = crypt.encrypt(password.value);
        const confirmPasswordEncrypted = crypt.encrypt(confirmPassword.value);
        if (
            confirmPasswordInputs(
                crypt.decrypt(passwordEncrypted),
                crypt.decrypt(confirmPasswordEncrypted)
            )
        ) {
            sexChecker();
            return db.users
                .add({
                    firstName: fName.value,
                    lastName: lName.value,
                    username: userNameInput.value,
                    email: emailInput.value,
                    password: passwordEncrypted,
                    birthDate: birthDate.value,
                    sex: sex,
                    registeredAt: new Date(),
                    profilePicture: "https://img.icons8.com/clouds/100/000000/user-male.png"
                })
                .then((id) => {
                    window.sessionStorage.setItem("userId", id);
                    location.href = "profile.html";
                    history.replaceState({}, "", "home.html");
                });
        } else {
            password.style.border = "2px solid red";
            confirmPassword.style.border = "2px solid red";
        }
    }

    // e.preventDefault();
}

//Login user
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
        db.transaction("r", db.users, () => {
            db.table("users")
                .toArray()
                .then((users) => {
                    users.forEach((user) => {
                        if (user.username == userNameLogin.value) {
                            found = true;
                            var passUser = crypt.decrypt(user.password);
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

//Check the value of radio button for sex
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
}

// confirm password
function confirmPasswordInputs(password, confirmPassword) {
    if (password == confirmPassword) {
        return true;
    } else {
        return false;
    }
}

// Check if user exists
function userChecker(username, usersArray) {
    for (let index = 0; index < usersArray.length; index++) {
        if (usersArray[index].username == username) {
            return usersArray.userId;
        }
    }
    return null;
}
export { SignUpUser, LogInUser };