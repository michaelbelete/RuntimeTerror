const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const userNameInput = document.querySelector("#userName");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#passwordConfirm");
const birthDate = document.querySelector("#birthDate");

async function SignUpUser(e) {
  e.preventDefault();
  return db.users
    .add({
      firstName: fName.value,
      lastName: lName.value,
      username: userName.value,
      email: emailInput.value,
      password: password.value,
      birthDate: birthDate.value,
    })
    .then((id) => {
      window.localStorage.setItem("userId", id);
      location.href = "profile.html";
    });

  // e.preventDefault();
}

export { SignUpUser };
