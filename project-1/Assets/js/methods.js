const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const userNameInput = document.querySelector("#userName");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#passwordConfirm");
const birthDate = document.querySelector("#birthDate");
const male = document.querySelector("#customRadioInline1");
const female = document.querySelector("#customRadioInline2");
let sex = "";
function SignUpUser(e) {
  e.preventDefault();
  sexChecker();
  return db.users
    .add({
      firstName: fName.value,
      lastName: lName.value,
      username: userName.value,
      email: emailInput.value,
      password: password.value,
      birthDate: birthDate.value,
      sex: sex,
    })
    .then((id) => {
      window.localStorage.setItem("userId", id);
      location.href = "profile.html";
      history.replaceState({}, "", "home.html");
    });

  // e.preventDefault();
}

function sexChecker() {
  if (male.checked) {
    sex = "Male";
  } else if (female.checked) {
    sex = "Female";
  }
}

function logInUser(e) {
  e.preventDefault();
}
export { SignUpUser };
